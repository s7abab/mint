const express = require("express");
const {
  getSelectedUser,
  uploadProfile,
  updateProfile,
  getCounselors,
  getCounselorProfile,
  bookAppointment,
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

module.exports = router;
