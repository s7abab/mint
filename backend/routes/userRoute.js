const express = require("express");
const {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
} = require("../controllers/userController");
const upload = require("../middleware/uploadImage");
const { isUser, isSigned } = require("../middleware/authMiddleware");
const router = express.Router();

// One User data
router
  .route("/user/:userId")
  .get(isSigned, isUser, getSelectedUser)
  .post(isSigned, isUser, updateProfile);

// Image Upload
router
  .route("/image/:userId")
  .post(isSigned, isUser, upload.single("image"), uploadProfile);

// Get all counselors
router.route("/counselors").get(getCounselors)

module.exports = router;
