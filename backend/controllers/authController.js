const { comparePassword, hashPassword } = require("../helpers/authHelper");
const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/OTPVerification");

//Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!confirmPassword) {
      return res.send({ message: "Password is Required" });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "Password do not match" });
    }
    const existingUser = await userModel.findOne({ email, isVerified: true });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registerd please login",
      });
    }
    // Not verified user
    const notVerifiedUser = await userModel.findOne({
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

    // REGISTER USER
    const hashedPassword = await hashPassword(password);
    //SAVE
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      otpExpiry: Date.now() + 60 * 1000,
    });
    await user.save();
    // Send OTP
    sendOTPEmail(email, user.otp);
    console.log(user.otp);

    res.status(201).send({
      success: true,
      message: "OTP sent successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
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

    const user = await userModel.findOne({
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

    const notVerifiedUser = await userModel.findOne({
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

//Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //Check user
    let user;
    const patient = await userModel.findOne({
      email,
      isVerified: true,
      isBlocked: false,
    });
    const counselor = await counselorModel.findOne({
      email,
      isVerified: true,
      isBlocked: false,
      status: "active",
    });
    if (patient) {
      user = patient;
    } else {
      user = counselor;
    }
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not registered",
      });
    }

    //Compare password
    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        image: user.image,
        booking: user.booking,
        isBlocked: user.isBlocked,
     
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login Api",
      error,
    });
  }
};

//get current user
const currentUser = async (req, res) => {
  try {
    let user;
    const patient = await userModel.findOne({
      _id: req.body.authId,
      isVerified: true,
      isBlocked: false,
    });
    const counselor = await counselorModel.findOne({
      _id: req.body.authId,
      isVerified: true,
      isBlocked: false,
      status: "active",
    });
    if (patient) {
      user = patient;
    } else {
      user = counselor;
    }

    return res.status(200).send({
      success: true,
      message: "User successfully featched",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to featch user",
      error,
    });
  }
};

module.exports = { login, register, currentUser, verifyOtp, resendOtp };
