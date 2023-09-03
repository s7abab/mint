const bookingModel = require("../models/bookingModel");
const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");

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
  const { counselorId, userId, counselorInfo, date, time } = req.body;
  if (counselorId || userId || counselorInfo || date || time) {
    return res.status(400).send({
      success: false,
      message: "Fill all the fields",
    });
  }
  try {
    req.body.status = "pending";
    const booking = new bookingModel({
      counselorId,
      userId,
      counselorInfo,
      date,
      time,
    });
    await booking.save();
    const counselor = await counselorModel.findOne({ _id: counselorId });
    counselor.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from `,
      onClickPatch: "/user/appointments",
    });
    await user.save();
    res.status(204).send({
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

module.exports = {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
  getCounselorProfile,
  bookAppointment,
};
