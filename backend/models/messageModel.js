const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
