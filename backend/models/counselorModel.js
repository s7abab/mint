const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const counselorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "counselor",
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: String, required: true },
    timings: {
      type: Array,
    },
    fee: { type: String, required: true },
    category: { type: String, required: true },
    booking: [{ type: Schema.Types.ObjectId }],
    image: { type: String },
    feedback: [{ type: Schema.Types.ObjectId }],
    report: [{ type: Schema.Types.ObjectId }],
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "active", " rejected"],
      default: "pending",
    },
    isVerified: { type: Boolean, default: false, required: true },
    otp: { type: String },
    otpExpiry: {
      type: Date,
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counselor", counselorSchema);
