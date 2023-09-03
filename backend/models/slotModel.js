const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const slotSchema = new mongoose.Schema(
  {
    counselorId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
