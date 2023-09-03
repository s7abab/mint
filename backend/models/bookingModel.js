const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    counselorId: {
      type: String,
      required: true,
    },
    counselorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
