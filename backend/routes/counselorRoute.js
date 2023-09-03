const express = require("express");
const {
  apply,
  getProfile,
  verifyOtp,
  resendOtp,
  uploadProfilePhoto,
  updateProfile,
  changeTime,
  timeSlots,
  createSlot,
  scheduledSlots,
} = require("../controllers/counselorController");
const upload = require("../middleware/uploadImage");
const { isCounselor, isSigned } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply route
router.route("/apply").post(apply);
// Verify OTP
router.route("/verify-otp").post(verifyOtp);
// Resend OTP
router.route("/resend-otp").post(resendOtp);
// Get profile
router
  .route("/profile/:counselorId")
  .get(isSigned, isCounselor, getProfile)
  .post(isSigned, isCounselor, updateProfile);
// Add time
router.route("/time/:counselorId").post(isSigned, isCounselor, changeTime);
// Image Upload
router
  .route("/image/:counselorId")
  .post(isSigned, isCounselor, upload.single("image"), uploadProfilePhoto);
// SLOTS
router.route("/create-slot").post(isSigned, isCounselor, createSlot);
router.route("/scheduled-slots").post(isSigned, isCounselor, scheduledSlots);
module.exports = router;
