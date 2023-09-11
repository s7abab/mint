const { hashPassword, comparePassword } = require("../helpers/authHelper");
const bookingModel = require("../models/bookingModel");
const counselorModel = require("../models/counselorModel");
const {
  sendOTPEmail,
  sendApplicationEmail,
} = require("../utils/OTPVerification");
const JWT = require("jsonwebtoken");
const moment = require("moment");
// Get Profile
const getProfile = async (req, res) => {
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
    //Validation
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
    // Notification
    // const admin = await userModel.findOne({ role: "admin" });
    // const notification = admin.notification;
    // notification.push({
    //   type: "apply-counselor-request",
    //   name: `${counselor.name}  has applied for a counselor account`,
    //   data: {
    //     counselorId: counselor._id,
    //     name: counselor.name,
    //     onClickPath: "/admin/counselors",
    //   },
    // });
    // await userModel.findByIdAndUpdate(admin._id, { notification });

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
};
