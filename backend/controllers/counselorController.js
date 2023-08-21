const { hashPassword } = require("../helpers/authHelper");
const counselorModel = require("../models/counselorModel");

//Apply controller
const apply = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      address,
      specialization,
      experience,
      fee,
    } = req.body;
    console.log(req.body)
    //Validation
    if (
      !firstname ||
      !lastname ||
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
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      specialization,
      experience,
      fee,
    });
    await counselor.save();

    res.status(200).send({
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

module.exports = { apply };
