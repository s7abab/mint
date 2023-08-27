const express = require("express");
const {
  addCategory,
  editCategory,
  unlistCategory,
  getCategoryById,
  getCategories,
  getApplications,
  changeStatus,
  getCounselors,
  blockCounselor,
} = require("../controllers/adminController");
const { isAdmin, isUser } = require("../middleware/authMiddleware");
const router = express.Router();

// Category
router.route("/category").post(addCategory).get(getCategories);

router
  .route("/category/:categoryId")
  .put(editCategory)
  .patch(unlistCategory)
  .get(getCategoryById);

// Applications
router.route("/applications").get(isUser,isAdmin,getApplications);

// Change status of counselor
router.route("/status/:counselorId").post(changeStatus);
// Get all counselors
router.route("/counselors")
.get(getCounselors)
.post(blockCounselor)

module.exports = router;
