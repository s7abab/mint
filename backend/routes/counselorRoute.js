const express = require("express");
const {
  apply,
  getProfile,
  verifyOtp,
  resendOtp,
  uploadProfilePhoto,
  updateProfile,
  changeTime,
  createSlot,
  scheduledSlots,
  cancelBookings,
  deleteSlot,
  bookingDetails,
  selectedBookings,
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

router.route("/cancel-booking").post(isSigned, isCounselor, cancelBookings);

router.route("/delete-slot").post(isSigned, isCounselor, deleteSlot);

// GET BOOKINGS DETAILS
router.route("/bookings").post(isSigned, isCounselor, bookingDetails);

// GET SELECTED BOOKING DETAILS
router
  .route("/selected-bookings")
  .post(isSigned, isCounselor, selectedBookings);
module.exports = router;
