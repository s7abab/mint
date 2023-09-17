const express = require("express");
const {
  login,
  register,
  currentUser,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");
const {
  isSigned,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);
router.route("/login").post(login);
router.route("/current-user").get(isSigned, currentUser);

module.exports = router;
