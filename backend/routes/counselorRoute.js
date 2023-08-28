const express = require("express");
const {
  apply,
  getProfile,
  verifyOtp,
  resendOtp,
} = require("../controllers/counselorController");
const router = express.Router();

// Apply route
router.route("/apply").post(apply);
// Verify OTP
router.route("/verify-otp").post(verifyOtp);
// Resend OTP
router.route("/resend-otp").post(resendOtp);
// Get profile
router.route("/profile/:counselorId").get(getProfile);

module.exports = router;
