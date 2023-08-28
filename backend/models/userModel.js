const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const UserSchema = new Schema({
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
  otp: { type: String },
  otpExpiry: {
    type: Date,
  },
  isVerified: { type: Boolean, default: false, required: true },
  isBlocked: { type: Boolean, default: false },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
