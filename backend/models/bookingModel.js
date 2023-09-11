const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    counselorId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    userAge: {
      type: String,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "booked", "completed", "cancelled", "userCancelled"],
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

module.exports = mongoose.model("Booking", bookingSchema);
