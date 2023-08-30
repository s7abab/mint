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
  getUsers,
  blockUsers,
} = require("../controllers/adminController");
const { isAdmin, isSigned, isUser } = require("../middleware/authMiddleware");
const router = express.Router();

// Category
router.route("/category").post(isSigned, isAdmin, addCategory).get( getCategories);

router
  .route("/category/:categoryId")
  .put(isSigned, isAdmin, editCategory)
  .patch(isSigned, isAdmin, unlistCategory)
  .get(getCategoryById);

// Applications
router.route("/applications").get(isSigned, isAdmin, getApplications);
// Change status of counselor
router.route("/status/:counselorId").post(isSigned, isAdmin, changeStatus);
// Get all counselors
router
  .route("/counselors")
  .get(isSigned, isUser || isAdmin , getCounselors)
  .post(isSigned, isAdmin, blockCounselor);
// Get all users
router.route("/users").get(isSigned, isAdmin, getUsers).post(isSigned, isAdmin, blockUsers);

module.exports = router;
