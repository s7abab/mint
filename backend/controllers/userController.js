const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");
const moment = require("moment");
const bookingModel = require("../models/bookingModel");
const { connections } = require("mongoose");

// GET ONE USER
const getSelectedUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await userModel.find({ _id: userid });
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getSelectedUser Api",
      error,
    });
  }
};

// PROFILE PHOTO UPLOAD
const uploadProfile = async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `/images/${req.file.filename}`;
      const { userId } = req.params;

      const image = await userModel.findOneAndUpdate(
        { _id: userId, isBlocked: false },
        { image: imageUrl }
      );
      res.status(200).send({
        success: true,
        message: "Profile photo updated",
        image,
      });
    }
    // Rest of your code
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Profile Upload Api",
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { field, value } = req.body;
    const { userid } = req.params;
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userid, isBlocked: false },
      { [field]: value },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "User profile updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update profile Api",
      error,
    });
  }
};

// Get all counselors
const getCounselors = async (req, res) => {
  try {
    const counselors = await counselorModel.find(
      { status: "active" },
      { name: 1, experience: 1, fee: 1, category: 1, image: 1 }
    );
    res.status(200).send({
      success: true,
      message: "Counselors featched",
      counselors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all counselors Api",
      error,
    });
  }
};

// Get specific counselor
const getCounselorProfile = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const counselors = await counselorModel.findById(counselorId);
    res.status(200).send({
      success: true,
      counselors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  const {
    counselorId,
    userId,
    counselorName,
    userName,
    userAge,
    note,
    date,
    time,
  } = req.body;
  if (
    !counselorId ||
    !userId ||
    !counselorName ||
    !userName ||
    !userAge ||
    !note ||
    !date ||
    !time
  ) {
    return res.status(400).send({
      success: false,
      message: "Fill all the fields",
    });
  }
  try {
    // Find an existing booking based on counselorId, date, and time
    const booking = await bookingModel.findOne({
      counselorId,
      date,
      time,
    });

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking fields
    booking.userId = userId;
    booking.counselorName = counselorName;
    booking.userName = userName;
    booking.userAge = userAge;
    booking.note = note;
    booking.status = "booked";

    await booking.save();

    // PUSH NOTIFICATION
    const counselor = await counselorModel.findOne({ _id: counselorId });
    counselor.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from ${userName}`,
      onClickPath: "counselor/bookings",
    });
    await counselor.save();
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:
        "An error occurred while booking the appointment. Please try again later.",
      error,
    });
  }
};

// BOOKING AVAILABILITY
// const bookingAvailability = async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const counselorId = req.body.counselorId;
//     const bookings = await bookingModel.find({
//       counselorId,
//       date,
//       time: {
//         $gt: fromTime,
//         $lt: toTime,
//       },
//     });
//     if (bookings.length > 0) {
//       return res.status(200).send({
//         success: false,
//         message: "Booking not available at this time",
//       });
//     } else {
//       return res.status(200).send({
//         success: true,
//         message: "Booking available",
//       });
//     }
//   } catch (error) {
//     console.log(error),
//       res.status(500).send({
//         success: false,
//         message:
//           "An error occured while checking availability, Please try again!",
//         error,
//       });
//   }
// };

// GET SLOTS
const scheduledSlots = async (req, res) => {
  try {
    const { counselorId } = req.body;
    const currentDate = new Date();
    const currentDateTime = moment(currentDate)
      .subtract(1, "days")
      .toISOString();

    // Find and delete expired slots
    await bookingModel.deleteMany({
      counselorId,
      date: { $lte: currentDateTime },
      status: "pending",
    });

    // Find available slots
    const slots = await bookingModel.find({
      counselorId,
      date: { $gte: currentDateTime },
    });

    res.status(200).json({
      success: true,
      message: "Slots fetched successfully",
      slots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving slots",
      error: error.message, // Send only the error message for security reasons
    });
  }
};

// GET ALL BOOKINGS DETAILS
const bookingDetails = async (req, res) => {
  try {
    const { authId } = req.body;
    if (!authId) {
      return res.status(200).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const bookings = await bookingModel.find({ userId: authId });
    res.status(200).send({
      success: true,
      message: "Booking details fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while fetching booking details",
      error,
    });
  }
};

// GET SPECIFIC BOOKING DETAILS
const selectedBookings = async (req, res) => {
  try {
    const { userId, counselorId, time, date } = req.body;
    if ((!userId || !counselorId, !time || !date)) {
      return res.status(200).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const bookings = await bookingModel.findById({
      userId,
      counselorId,
      time,
      date,
    });
    res.status(200).send({
      success: true,
      message: "Booking details fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while fetching booking details",
      error,
    });
  }
};

// CANCEL BOOKING
const cancelBookings = async (req, res) => {
  try {
    const { _id, counselorId, time, date } = req.body;

    const Time = moment(time, "HH:mm").add(1, "hours").toISOString();
    const Date = moment(date, "DD-MM-YYYY").toISOString();

    const existingSlot = await bookingModel.find({
      _id,
      $and: [{ time: { $gt: Time } }, { date: { $gte: Date } }],
    });

    if (existingSlot.length > 0) {
      const newTime = existingSlot[0].time;
      const newDate = existingSlot[0].date;
      console.log(newTime);

      const newSlot = new bookingModel({
        counselorId,
        date: newDate,
        time: newTime,
        status: "pending",
      });
      await newSlot.save();
    }

    const slot = await bookingModel.findById(_id);
    slot.status = "userCancelled";
    await slot.save();
    res.status(200).send({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while canceling booking",
      error,
    });
  }
};

module.exports = {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
  getCounselorProfile,
  bookAppointment,
  bookingDetails,
  scheduledSlots,
  bookingDetails,
  selectedBookings,
  cancelBookings,
};
