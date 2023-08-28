const { hashPassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const counselorModel = require("../models/counselorModel");
const sendOTPEmail = require("../utils/OTPVerification");

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


module.exports = { apply, getProfile, verifyOtp, resendOtp };
