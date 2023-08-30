const express = require("express");
const {
  login,
  register,
  test,
  currentUser,
  sendOTP,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");
const {
  isAdmin,
  isUser,
  isCounselor,
  isSigned,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);
router.route("/login").post(login);
router.route("/test").get(isUser, isAdmin, test);
router.route("/current-user").get(isSigned, currentUser);

module.exports = router;
