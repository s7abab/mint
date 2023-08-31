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
        { _id: userId },
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
      { _id: userid },
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

module.exports = {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
  getCounselorProfile,
};
