const express = require("express");
const {
  getAllUsers,
  getSelectedUser,
  uploadProfile,
} = require("../controllers/userController");
const upload = require("../middleware/uploadImage");
const router = express.Router();

//All Users data
router.route("/users").get(getAllUsers);
// One User data
router.route("/user/:name").get(getSelectedUser);
// Image Upload
router.route("/image/:name").post(upload.single("image"), uploadProfile);

module.exports = router;
