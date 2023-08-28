const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const counselorSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "counselor",
  },

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  experience: { type: String, required: true },
  fee: { type: String, required: true },
  category: { type: String, required: true },
  booking: [{ type: Schema.Types.ObjectId }],
  status: {
    type: String,
    enum: ["pending", " active", " rejected"],
    default: "pending",
  },
  image: { type: String },
  isVerified: { type: Boolean, default: false, required: true },
  isBlocked: { type: Boolean, default: false },
  feedback: [{ type: Schema.Types.ObjectId }],
  report: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Counselor", counselorSchema);
