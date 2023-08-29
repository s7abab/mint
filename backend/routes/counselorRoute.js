const express = require("express");
const {
  apply,
  getProfile,
  verifyOtp,
  resendOtp,
  uploadProfilePhoto,
  updateProfile,
} = require("../controllers/counselorController");
const upload = require("../middleware/uploadImage");

const router = express.Router();

// Apply route
router.route("/apply").post(apply);
// Verify OTP
router.route("/verify-otp").post(verifyOtp);
// Resend OTP
router.route("/resend-otp").post(resendOtp);
// Get profile
router.route("/profile/:counselorId").get(getProfile).post(updateProfile)
// Image Upload
router.route("/image/:counselorId").post(upload.single("image"), uploadProfilePhoto);

module.exports = router;
