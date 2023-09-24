const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
    counselorId: {
      type: ObjectId,
      ref: "Counselor",
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
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
    fee: {
      type: Number,
      default: 0,
    },
    feedback: {
      feedback: {
        type: String,
        default: "",
      },
      rating: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
