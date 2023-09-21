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
    wallet: {
      balance: {
        type: Number,
        default: 0,
      },
      incomeTransactions: [Object],
      withdrawTransactions: [Object],
    },
    bankAC: {
      acNo: String,
      ifsc: String,
      name: String,
    },
    isWithdraw: { type: Boolean, default: false },
    category: { type: String, required: true },
    image: { type: String },
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
    connections: { type: [ObjectId], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counselor", counselorSchema);
