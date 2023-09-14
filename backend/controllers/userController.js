const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");
const moment = require("moment");
const bookingModel = require("../models/bookingModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { error } = require("console");
const { default: mongoose } = require("mongoose");

const map = new Map();
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
    userName,
    userAge,
    note,
    date,
    time,
    razorpay_order_id,
    amount,
    walletAmount,
  } = req.body;
  if (
    !counselorId ||
    !userId ||
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
    if (razorpay_order_id) {
      let razorpay = false;
      const a = map.get(req.body.authId);
      // Find an existing booking based on counselorId, date, and time
      if (razorpay_order_id === a.id) {
        //&& amount == a.amount / 100
        razorpay = true;
      }
      if (!razorpay) {
        throw new Error("Razorpay id is not match");
      }
    }

    const booking = await bookingModel.findOne({
      counselorId,
      date,
      time,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking fields
    booking.userId = userId;
    booking.userName = userName;
    booking.userAge = userAge;
    booking.note = note;
    booking.status = "booked";
    await booking.save();

    if (walletAmount > 0) {
      const userData = await userModel.findByIdAndUpdate(userId, {
        $inc: { "wallet.balance": -walletAmount },
        $push: {
          "wallet.transactions": `-${walletAmount} Transaction Id ${booking._id}`,
        },
      });
    }
    const counselorData = await counselorModel.findById(counselorId);
    const fee = counselorData.fee;
    await counselorModel.findByIdAndUpdate(
      counselorId,
      {
        $inc: { "wallet.balance": fee },
        $push: {
          "wallet.incomeTransactions": `+${fee} Transaction Id = ${booking._id}`,
        },
      },
      { new: true } //add money to wallet
    );

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
      status: { $ne: "userCancelled" },
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
    const userId = new mongoose.Types.ObjectId(authId);
    const bookings = await bookingModel.aggregate([
      {
        $match: { userId }
      },
      {
        $lookup:{
          from:"counselors",
          localField:"counselorId",
          foreignField:"_id",
          as:"counselorData"
        }
      },
      {
        $unwind:"$counselorData"
      },
      {
        $project:{
          counselorId:1,
          userId:1,
          counselorName:"$counselorData.name",
          userName:1,
          date:1,
          time:1,
          status:1,

        }
      }
    ]);

    console.log(bookings);
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
    const { _id, counselorId, userId, time, date } = req.body;

    const slot = await bookingModel.findById(_id);
    slot.status = "userCancelled";
    await slot.save();

    const Time = slot.time;
    const Date = slot.date;
    const newSlot = new bookingModel({
      counselorId,
      date: Date,
      time: Time,
      status: "pending",
    });
    await newSlot.save();
    //Increment money in user's wallet
    const counselor = await counselorModel.findById(counselorId);
    const fee = counselor.fee;
    await userModel.findByIdAndUpdate(
      userId,
      {
        $inc: { "wallet.balance": fee },
        $push: { "wallet.transactions": `+${fee} Transaction Id = ${_id}` },
      },
      { new: true } //add money to wallet
    );

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

// PAYMENT INTEGRATION
const orders = async (req, res) => {
  try {
    const intance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    intance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" });
      }
      map.set(req.body.authId, order);
      res.status(200).send({
        data: order,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server issue",
    });
  }
};

// PAYMENT VERIFY
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;
    const a = map.get(req.body.authId);
    console.log(req.body, a);

    if (razorpay_order_id === a.id && amount == a.amount) {
      return res.status(200).send({ message: "Payment verified successfully" });
    } else {
      return res.status(400).send({
        message: "Invalid signature sent",
      });
    }
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
  }
};

// Get wallet amount
const getWalletAmount = async (req, res) => {
  const { authId } = req.body;
  try {
    const wallet = await userModel.findById(authId);
    res.status(200).send({
      success: true,
      wallet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro occured while get wallet amount",
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
  orders,
  verifyPayment,
  getWalletAmount,
};
