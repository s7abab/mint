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
  getWalletAmount,
  changeBankDetails,
  fethBankDetails,
  withdrawalReq,
  sessionCompleted,
  getSelectedUser,
  getConnections,
  bookingsData,
} = require("../controllers/counselorController");
const upload = require("../middleware/uploadImage");
const { isCounselor, isSigned } = require("../middleware/authMiddleware");
const { profitData } = require("../controllers/adminController");

const router = express.Router();

// Apply route
router.route("/apply").post(apply);
// OTP
router.route("/verify-otp").post(verifyOtp);
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
router
  .route("/session-completed")
  .post(isSigned, isCounselor, sessionCompleted);

// GET BOOKINGS DETAILS
router.route("/bookings").post(isSigned, isCounselor, bookingDetails);
router
  .route("/selected-bookings")
  .post(isSigned, isCounselor, selectedBookings);

// PAYMENTS
router.route("/walletAmount").get(isSigned, isCounselor, getWalletAmount);
router.route("/withdrawReq").post(isSigned, isCounselor, withdrawalReq);

// BANK AC DETAILS
router
  .route("/changeBankDetails")
  .post(isSigned, isCounselor, changeBankDetails);
router.route("/bankAc").post(isSigned, isCounselor, fethBankDetails);

// GET SELECTED USER
router.route("/get-user").post(isSigned, isCounselor, getSelectedUser);
router.route("/connections").get(isSigned, isCounselor, getConnections);
router.route("/bookings-data").get(isSigned, isCounselor, bookingsData);
router.route("/profit-data").get(isSigned, isCounselor, profitData);

module.exports = router;
