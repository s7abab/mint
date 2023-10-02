const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const kycSchema = new mongoose.Schema(
  {
    counselorId: {
      type: ObjectId,
      ref: "Counselor",
      required: true,
    },
    document: {
      type: String,
      enum: ["Aadhaar", "PanCard", "VoterId", "Passport"],
      required: true,
    },
    identityProof: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kyc", kycSchema);
