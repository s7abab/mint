const express = require("express");
const { apply, getProfile } = require("../controllers/counselorController");
const router = express.Router();

// Apply route
router.route("/apply").post(apply);

// Get profile
router.route("/profile/:counselorId").get(getProfile);

module.exports = router;
