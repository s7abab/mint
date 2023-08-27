const { comparePassword, hashPassword } = require("../helpers/authHelper");
const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");

//test
const test = async (req, res) => {
  res.send("Test Page");
};

//Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    //VALIDATION
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
    //CHECK USER
    const existingUser = await userModel.findOne({ email });
    //EXISTING USER
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registerd please login",
      });
    }
    // REGISTER USER
    const hashedPassword = await hashPassword(password);
    //SAVE
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "User registerd successfully",
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
    const patient = await userModel.findOne({ email });
    const counselor = await counselorModel.findOne({ email });
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
        name: user.name,
        _id: user._id,
        email: user.email,
        role: user.role,
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
    const user = await userModel.findOne({ _id: req.body.userId });
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

module.exports = { login, register, test, currentUser };
