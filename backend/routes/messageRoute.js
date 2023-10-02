const express = require("express");
const { isSigned } = require("../middleware/authMiddleware");
const {
  postMessage,
  getOppositeMessage,
  getMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.route("/post-message").post(isSigned, postMessage);
router.route("/get-message").post(isSigned, getMessage);
router.route("/get-opposite-message").post(isSigned, getOppositeMessage);

module.exports = router;
