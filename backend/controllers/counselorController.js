const { hashPassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const counselorModel = require("../models/counselorModel");

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

    const existingCounselor = await counselorModel.findOne({ email });
    if (existingCounselor) {
      return res.status(400).send({
        success: false,
        message: "Apllication alredy sent",
      });
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
    });
    await counselor.save();
    const admin = await userModel.findOne({ role: "admin" });
    const notification = admin.notification;
    notification.push({
      type: "apply-counselor-request",
      name: `${counselor.name}  has applied for a counselor account`,
      data: {
        counselorId: counselor._id,
        name: counselor.name,
        onClickPath: "/admin/counselors",
      },
    });
    await userModel.findByIdAndUpdate(admin._id, { notification });

    res.status(201).send({
      success: true,
      message: "Application send successfully",
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

module.exports = { apply, getProfile };
