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
    const { name } = req.params;
    const user = await userModel.find({ name });
    res.status(200).send({
      success: true,
      user,
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

// PROFILE PHOTO UPLOAD
const uploadProfile = async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `/images/${req.file.filename}`;
      console.log(imageUrl); // Moved inside the if block
      const {name} = req.params;
      
      const image = await userModel.findOneAndUpdate({name:name}, {image:imageUrl});
      res.status(200).send({
        success:true,
        message:"Profile photo updated",
        image
      })
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


module.exports = { getAllUsers, getSelectedUser, uploadProfile };
