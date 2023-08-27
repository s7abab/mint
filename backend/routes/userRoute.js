const express = require("express");
const {
  getAllUsers,
  getSelectedUser,
  uploadProfile,
  updateProfile,
} = require("../controllers/userController");
const upload = require("../middleware/uploadImage");
const router = express.Router();

// All Users data
router.route("/users").get(getAllUsers);

// One User data
router.route("/user/:userId").get(getSelectedUser).post(updateProfile);

// Image Upload
router.route("/image/:userId").post(upload.single("image"), uploadProfile);

module.exports = router;
