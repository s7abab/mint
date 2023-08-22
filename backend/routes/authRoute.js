const express = require("express");
const { login, register, test, currentUser } = require("../controllers/authController");
const { isAdmin, isUser, isCounselor } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/test").get(isUser,isAdmin, test);
router.route("/current-user").get(isUser, currentUser);

module.exports = router;
