const { hashPassword, comparePassword } = require("../helpers/authHelper");
const bookingModel = require("../models/bookingModel");
const counselorModel = require("../models/counselorModel");
const {
  sendOTPEmail,
  sendApplicationEmail,
} = require("../utils/OTPVerification");
const JWT = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const counselors = await counselorModel.findById(counselorId, {
      _id: 1,
      name: 1,
      email: 1,
      role: 1,
      address: 1,
      experience: 1,
      fee: 1,
      category: 1,
      image: 1,
    });
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

// Apply controller
const apply = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      address,
      specialization,
      experience,
      fee,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !address ||
      !specialization ||
      !experience ||
      !fee
    ) {
      return res.status(400).send({
        success: false,
        message: "Fill all the fields",
      });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "Password do not match" });
    }
    // Check existing counselor
    const existingCounselor = await counselorModel.findOne({
      email,
      isVerified: true,
    });
    if (existingCounselor) {
      return res.status(400).send({
        success: false,
        message: "Apllication alredy sent",
      });
    }
    // Not verified counselor
    const notVerifiedUser = await counselorModel.findOne({
      email,
      isVerified: false,
    });
    if (notVerifiedUser) {
      if (notVerifiedUser.otpExpiry && notVerifiedUser.otpExpiry > Date.now()) {
        sendOTPEmail(email, notVerifiedUser.otp);
        return res.status(200).send({
          success: true,
          message: "OTP resent successfully",
        });
      } else {
        notVerifiedUser.otp = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        notVerifiedUser.otpExpiry = Date.now() + 60 * 1000;
        await notVerifiedUser.save();

        // Send new OTP
        sendOTPEmail(email, notVerifiedUser.otp);
        return res.status(200).send({
          success: true,
          message: "OTP sent successfully",
        });
      }
    }

    const hashedPassword = await hashPassword(password);
    req.body.status = "pending";
    const counselor = new counselorModel({
      name,
      email,
      password: hashedPassword,
      address,
      category: specialization,
      experience,
      fee,
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      otpExpiry: Date.now() + 60 * 1000,
    });
    await counselor.save();

    // Send OTP
    sendOTPEmail(email, counselor.otp);
    console.log(counselor.otp);
    res.status(200).send({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in apply Api",
      error,
    });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);
    const currentTime = Date.now();

    const user = await counselorModel.findOne({
      email,
      otp,
      otpExpiry: { $gt: currentTime }, // Check if OTP is still valid
    });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    sendApplicationEmail(user.email);

    res.status(200).send({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in verify OTP API",
      error,
    });
  }
};

// Resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const notVerifiedUser = await counselorModel.findOne({
      email,
      isVerified: false,
    });

    if (!notVerifiedUser) {
      return res.status(200).send({
        success: false,
        message: "User not found or already verified",
      });
    }

    if (notVerifiedUser.otpExpiry && notVerifiedUser.otpExpiry > Date.now()) {
      sendOTPEmail(email, notVerifiedUser.otp);
      return res.status(200).send({
        success: true,
        message: "OTP resent successfully",
      });
    } else {
      notVerifiedUser.otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      notVerifiedUser.otpExpiry = Date.now() + 60 * 1000;
      await notVerifiedUser.save();

      // Send new OTP
      sendOTPEmail(email, notVerifiedUser.otp);
      return res.status(200).send({
        success: true,
        message: "OTP sent successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in resending OTP",
      error,
    });
  }
};
// Upload Profile Photo
const uploadProfilePhoto = async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `/images/${req.file.filename}`;
      const { counselorId } = req.params;

      const image = await counselorModel.findOneAndUpdate(
        { _id: counselorId },
        { image: imageUrl }
      );
      res.status(200).send({
        success: true,
        message: "Profile photo updated",
        image,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in upload profile Api",
      error,
    });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { values } = req.body;
    // console.log(values);
    const updatedUser = await counselorModel.findOneAndUpdate(
      { _id: counselorId },
      { $set: values },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Counselor profile updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in counselor update profile Api",
      error,
    });
  }
};
const changeTime = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { timings } = req.body;

    await counselorModel.findByIdAndUpdate({ _id: counselorId }, { timings });
    res.status(200).send({
      success: true,
      message: "Time updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in changing time",
      error,
    });
  }
};

// CREATE SLOT
const createSlot = async (req, res) => {
  try {
    const { counselorId, date, time } = req.body;
    const Date = moment(date, "DD-MM-YYYY").toISOString();
    const Time = moment(time, "HH:mm").toISOString();
    // CHECKING AVAILABILITY (1HR)
    const fromTime = moment(time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(time, "HH:mm").add(1, "hours").toISOString();

    const existingSlot = await bookingModel.find({
      counselorId,
      status: { $in: ["pending", "booked"] },
      date: Date,
      time: {
        $gt: fromTime,
        $lt: toTime,
      },
    });
    if (existingSlot.length > 0) {
      return res.status(200).send({
        success: false,
        message: "Slot already existing on this time",
      });
    }
    const slot = new bookingModel({
      counselorId,
      date: Date,
      time: Time,
      status: "pending",
    });
    await slot.save();
    res.status(200).send({
      success: true,
      message: "New time slot created",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occured while creating slot",
      error,
    });
    console.log(error);
  }
};

// GET CREATED SLOTS
const scheduledSlots = async (req, res) => {
  try {
    const slots = await bookingModel.find({ counselorId: req.body.authId });
    res.status(200).send({
      success: true,
      message: "slots fetched",
      slots,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message:
          "An error occured while fetching created slots, Please try again later",
        error,
      });
  }
};

// CANCEL BOOKING
const cancelBookings = async (req, res) => {
  try {
    const { _id, counselorId } = req.body;
    const slot = await bookingModel.findOne({
      _id,
      counselorId,
    });
    slot.status = "cancelled";
    await slot.save();
    res.status(200).send({
      success: true,
      message: "Booking cancelled successfully",
    });
    // Increase money in users wallet
    const date = moment().format("DD-MM-YYYY");
    await userModel.findByIdAndUpdate(
      slot.userId,
      {
        $inc: { "wallet.balance": slot.fee },
        $push: {
          "wallet.transactions": {
            amount: slot.fee,
            date: date,
            bookingId: _id,
          },
        },
      },
      { new: true } //add money to wallet
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while canceling booking",
      error,
    });
  }
};

// DELETE SLOT
const deleteSlot = async (req, res) => {
  try {
    const { _id, counselorId } = req.body;

    const slot = await bookingModel.findOneAndDelete({
      _id,
      counselorId,
      status: "pending",
    });
    res.status(200).send({
      success: true,
      message: "Slot deleted successfully",
      slot,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while deleting booking",
      error,
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
    const bookings = await bookingModel.find({ counselorId: authId });
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
    const { counselorId, userId, time, date } = req.body;
    if ((!userId || !counselorId, !time || !date)) {
      return res.status(200).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const bookings = await bookingModel.findById({
      counselorId,
      userId,
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

// Get wallet amount
const getWalletAmount = async (req, res) => {
  const { authId } = req.body;
  try {
    const wallet = await counselorModel.findById(authId, { wallet: 1, _id: 0 });
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

// Change bank ac details
const changeBankDetails = async (req, res) => {
  const { acNo, ifsc, name, authId } = req.body;
  console.log(req.body);
  try {
    await counselorModel.findByIdAndUpdate(authId, {
      $set: {
        "bankAC.acNo": acNo,
        "bankAC.ifsc": ifsc,
        "bankAC.name": name,
      },
    });
    res.status(200).send({
      success: true,
      message: "New Bank Details Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// Fetch bank details
const fethBankDetails = async (req, res) => {
  try {
    const bankAc = await counselorModel.findById(req.body.authId, {
      bankAC: 1,
      _id: 0,
    });
    res.status(200).send({
      success: true,
      message: "Bank Details Fetched",
      bankAc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// Withdrawal req wallet money
const withdrawalReq = async (req, res) => {
  try {
    const { authId } = req.body;
    await counselorModel.findByIdAndUpdate(authId, {
      isWithdraw: true,
    });
    res.status(200).send({
      success: true,
      message: "Withdrawal requested successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in withdrawal req",
      error,
    });
  }
};

// Make session completed
const sessionCompleted = async (req, res) => {
  const { bookingId, authId } = req.body;
  try {
    await bookingModel.updateOne(
      { _id: bookingId, counselorId: authId },
      {
        status: "completed",
      },
      {
        new: true,
      }
    );
    const date = moment().format("DD:MM:YYYY");
    const counselorData = await counselorModel.findById(authId);
    const fee = counselorData.fee;
    const profit = fee * 0.8;
    await counselorModel.findByIdAndUpdate(
      authId,
      {
        $inc: { "wallet.balance": profit },
        $push: {
          "wallet.incomeTransactions": {
            amount: profit,
            date: date,
            bookingId: bookingId,
          },
        },
      },
      { new: true } //add money to wallet
    );

    res.status(200).send({
      success: true,
      message: "Session completed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const getSelectedUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    const { password, ...other } = user._doc;
    res.status(200).send({
      success: true,
      other,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const getConnections = async (req, res) => {
  try {
    const authId = new mongoose.Types.ObjectId(req.body.authId);
    const connections = await counselorModel.aggregate([
      { $match: { _id: authId } },
      {
        $lookup: {
          from: "users",
          localField: "connections",
          foreignField: "_id",
          as: "connectionsData",
        },
      },
      { $unwind: "$connectionsData" },
      {
        $project: {
          name: "$connectionsData.name",
          image: "$connectionsData.image",
          _id: 0,
          receiverId: `$connectionsData._id`,
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "Connections fethced succussfully",
      connections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while fetching connections",
      error,
    });
  }
};
// data for chart
const bookingsData = async (req, res) => {
  const counselorId = new mongoose.Types.ObjectId(req.body.authId);
  try {
    const bookings = await bookingModel.aggregate([
      { $match: { counselorId, status: { $ne: "pending" } } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          cancelledBookings: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
            },
          },
          userCancelledBookings: {
            $sum: {
              $cond: [{ $eq: ["$status", "userCancelled"] }, 1, 0],
            },
          },
          completedBookings: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
        },
      },
    ]);
    if (bookings.length > 0) {
      const bookingsData = bookings[0];
      res.status(200).send({
        success: true,
        bookingsData,
      });
    } else {
      res.status(200).send({
        totalBookings: 0,
        cancelledBookings: 0,
        userCancelledBookings: 0,
        completedBookings: 0,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching bookings for chart",
      error,
    });
  }
};

const profitData = async (req, res) => {
  try {
    const counselorId = new mongoose.Types.ObjectId(req.body.authId);
    const monthlyProfits = await bookingModel.aggregate([
      {
        $match: {
          counselorId,
          status: "completed",
        },
      },
      {
        $project: {
          fee: 1,
          date: {
            $dateFromString: {
              dateString: "$date",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            // year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalFee: { $sum: "$fee" }, // Calculate the total fee for the month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    // Calculate profit as 80% of totalFee for each month
    const monthlyProfitsWithProfit = monthlyProfits.map((monthProfit) => ({
      ...monthProfit,
      profit: monthProfit.totalFee * 0.8,
    }));

    res.status(200).send({
      success: true,
      message: "Profits for chart fetched successfully",
      monthlyProfits: monthlyProfitsWithProfit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error occurred while calculating monthly profits",
      error,
    });
  }
};

module.exports = {
  apply,
  getProfile,
  verifyOtp,
  resendOtp,
  uploadProfilePhoto,
  updateProfile,
  changeTime,
  createSlot,
  scheduledSlots,
  cancelBookings,
  deleteSlot,
  bookingDetails,
  selectedBookings,
  getWalletAmount,
  changeBankDetails,
  fethBankDetails,
  withdrawalReq,
  sessionCompleted,
  getSelectedUser,
  getConnections,
  bookingsData,
  profitData,
};
