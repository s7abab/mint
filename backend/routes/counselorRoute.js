const express = require("express");
const { apply } = require("../controllers/counselorController");
const router = express.Router();

//Apply route
router.route("/apply").post(apply)

module.exports = router;