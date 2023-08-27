const userModel = require("../models/userModel");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllUsers Api",
      error,
    });
  }
};

// GET ONE USER
const getSelectedUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.find({ _id: userId });
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
    const { userId } = req.params;
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
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

module.exports = { getAllUsers, getSelectedUser, uploadProfile, updateProfile };
