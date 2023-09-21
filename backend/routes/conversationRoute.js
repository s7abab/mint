const express = require("express");
const {
  newConversation,
  getConversation,
} = require("../controllers/conversationController");
const router = express.Router();

// new conversation
router.route("/new-conversation").post(newConversation);
// get conversation
router.route("/get").post(getConversation);

module.exports = router;
