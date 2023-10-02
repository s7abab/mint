const kycModel = require("../models/kycModel");
const counselorModel = require("../models/counselorModel");
const {
  sendKycApproveEmail,
  sendKycRejectEmail,
} = require("../utils/OTPVerification");

const kycRequest = async (req, res) => {
  const { authId, document } = req.body;
  try {
    const imageUrl = `/images/${req.file.filename}`;

    const newKyc = new kycModel({
      counselorId: authId,
      document,
      identityProof: imageUrl,
      status: "pending",
    });
    await newKyc.save();
    const counselor = await counselorModel.findByIdAndUpdate(
      authId,
      { $set: { "wallet.kycSend": true } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Kyc send succussfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error occured while kyc request",
    });
  }
};

const getAllKyc = async (req, res) => {
  try {
    const kycs = await kycModel.find({ status: "pending" }).populate({
      path: "counselorId",
      select: "name",
    });
    res.status(200).send({
      success: true,
      message: "Kycs fetched successfully",
      kycs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured during fetching kycs",
      error,
    });
  }
};
const changeStatusOfKyc = async (req, res) => {
  const { kycId, status, reason, counselorId } = req.body;
  console.log(status, "asd")
  try {
    const kyc = await kycModel.findByIdAndUpdate(
      kycId,
      {
        status: status,
      },
      { new: true }
    );
    const counselor = await counselorModel.findByIdAndUpdate(counselorId, {
      $set: { "wallet.kycSend": false, "wallet.isKyc": true },
    });
    const email = counselor.email;
    if (status === "approved") {
      sendKycApproveEmail(email);
    } else if (status === "rejected") {
      sendKycRejectEmail(email);
    }
    res.status(200).send({
      success: true,
      message: "Kyc status changed",
      kyc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured during changing status of kycs",
      error,
    });
  }
};

module.exports = { kycRequest, getAllKyc, changeStatusOfKyc };
