const express = require("express");
const {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
  getCounselorProfile,
  bookAppointment,
  scheduledSlots,
  bookingDetails,
  selectedBookings,
  cancelBookings,
  orders,
  verifyPayment,
  getWalletAmount,
} = require("../controllers/userController");
const upload = require("../middleware/uploadImage");
const { isUser, isSigned } = require("../middleware/authMiddleware");
const router = express.Router();

// SELECTED USER DATA
router
  .route("/user/:userid")
  .get(isSigned, isUser, getSelectedUser)
  .post(isSigned, isUser, updateProfile);

// PROFILE PHOTO UPLOAD
router
  .route("/image/:userId")
  .post(isSigned, isUser, upload.single("image"), uploadProfile);

// GET ALL COUNSELORS
router.route("/counselors").get(isSigned, isUser, getCounselors);

// GET SELECTED COUNSELOR
router
  .route("/counselor/:counselorId")
  .get(isSigned, isUser, getCounselorProfile);

// BOOK APPOINTMENT
router.route("/book-appointment").post(isSigned, isUser, bookAppointment);

// GET SLOTS
router.route("/scheduled-slots").post(isSigned, isUser, scheduledSlots);

// GET BOOKINGS DETAILS
router.route("/bookings").post(isSigned, isUser, bookingDetails);

// GET SELECTED BOOKING DETAILS
router.route("/selected-bookings").post(isSigned, isUser, selectedBookings);

// CANCEL BOOKING
router.route("/cancel-booking").post(isSigned, isUser, cancelBookings);

// PAYMENT INTENT
router.route("/payment").post(isSigned, isUser, orders);
router.route("/verifyPayment").post(isSigned, isUser, verifyPayment);
router.route("/walletAmount").get(isSigned, isUser, getWalletAmount);

module.exports = router;

