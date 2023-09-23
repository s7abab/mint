const express = require("express");
const upload = require("../middleware/uploadImage");
const {
  kycRequest,
  getAllKyc,
  changeStatusOfKyc,
} = require("../controllers/kycController");
const {
  isSigned,
  isCounselor,
  isAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/kyc-req")
  .post(upload.single("image"), isSigned, isCounselor, kycRequest);
router
  .route("/kyc")
  .get(upload.single("image"), isSigned, isAdmin, getAllKyc)
  .post(changeStatusOfKyc);

module.exports = router;
