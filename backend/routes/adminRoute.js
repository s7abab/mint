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
  getCounselorProfile,
  getSelectedUser,
  getWithdrawals,
  settlement,
  totalUsers,
  totalCounselors,
  profitData,
} = require("../controllers/adminController");
const { isAdmin, isSigned } = require("../middleware/authMiddleware");
const router = express.Router();

// Category
router
  .route("/category")
  .post(isSigned, isAdmin, addCategory)
  .get(getCategories);
router
  .route("/category/:categoryId")
  .put(isSigned, isAdmin, editCategory)
  .patch(isSigned, isAdmin, unlistCategory)
  .get(getCategoryById);

// CounselorsApplications
router.route("/applications").get(isSigned, isAdmin, getApplications);
router.route("/status/:counselorId").post(isSigned, isAdmin, changeStatus);
// Get all counselors
router
  .route("/counselors")
  .get(isSigned, isAdmin, getCounselors)
  .post(isSigned, isAdmin, blockCounselor);
router
  .route("/counselor/:counselorId")
  .get(isSigned, isAdmin, getCounselorProfile);
// Get all users
router
  .route("/users")
  .get(isSigned, isAdmin, getUsers)
  .post(isSigned, isAdmin, blockUsers);
router.route("/user/:userId").get(isSigned, isAdmin, getSelectedUser);
// Withdrawals
router
  .route("/withdrawals")
  .get(isSigned, isAdmin, getWithdrawals)
  .post(settlement);
// Charts
router.route("/profit-data").get(isSigned, isAdmin, profitData);
router.route("/total-users").get(isSigned, isAdmin, totalUsers);
router.route("/total-counselors").get(isSigned, isAdmin, totalCounselors);

module.exports = router;
