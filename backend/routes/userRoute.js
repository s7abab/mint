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
  searchCounselors,
  addFeedback,
} = require("../controllers/userController");
const upload = require("../middleware/uploadImage");
const {
  isUser,
  isSigned,
} = require("../middleware/authMiddleware");
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
// GET COUNSELORS
router.route("/counselors").get(isSigned, isUser, getCounselors);
router.route("/search-counselors").get(isSigned, isUser, searchCounselors);
router
  .route("/counselor/:counselorId")
  .get(isSigned, isUser, getCounselorProfile);
// GET SLOTS
router.route("/scheduled-slots").post(isSigned, isUser, scheduledSlots);
// BOOKINGS
router.route("/book-appointment").post(isSigned, isUser, bookAppointment);
router.route("/bookings").post(isSigned, isUser, bookingDetails);
router.route("/selected-bookings").post(isSigned, isUser, selectedBookings);
router.route("/cancel-booking").post(isSigned, isUser, cancelBookings);
// PAYMENT INTENT
router.route("/payment").post(isSigned, isUser, orders);
router.route("/verifyPayment").post(isSigned, isUser, verifyPayment);
router.route("/walletAmount").get(isSigned, isUser, getWalletAmount);
// FEEDBACK
router.route("/feedback").post(isSigned, isUser, addFeedback);

module.exports = router;
