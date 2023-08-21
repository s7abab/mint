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
  isBlocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
