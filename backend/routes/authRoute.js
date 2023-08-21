const express = require("express");
const { login, register, test } = require("../controllers/authController");
const { isAdmin, isUser, isCounselor } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/test").get(isUser, isCounselor, test);

module.exports = router;
