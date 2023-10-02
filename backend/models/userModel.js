const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    booking: [{ type: Schema.Types.ObjectId }],
    wallet: {
      balance: {
        type: Number,
        default: 0,
      },
      transactions: [Object],
    },
    otp: { type: String },
    otpExpiry: {
      type: Date,
    },
    isVerified: { type: Boolean, default: false, required: true },
    isBlocked: { type: Boolean, default: false },
    connections: { type: [ObjectId], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
