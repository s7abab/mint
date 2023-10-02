const categoryModal = require("../models/categoryModel");
const counselorModel = require("../models/counselorModel");
const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");
const {
  sendRejectionEmail,
  sendApprovalEmail,
} = require("../utils/OTPVerification");
const moment = require("moment");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const nameRegex = /^[A-Za-z0-9\s]+$/; // This pattern allows letters, numbers, and spaces
    if (!name) {
      return res.status(400).send({ message: "Fill the field" });
    }
    if (!nameRegex.test(name)) {
      return res.status(400).send({ message: "Invalid category name" });
    }
    const existingCategory = await categoryModal.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already added",
      });
    }
    // Save the category with the original case
    const category = new categoryModal({ name });
    await category.save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in category",
      error,
    });
  }
};
// edit category
const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    // Define a regex pattern for the category name
    const nameRegex = /^[A-Za-z0-9\s]+$/; // This pattern allows letters, numbers, and spaces
    if (!name) {
      return res.status(400).send({ message: "Fill the field" });
    }
    if (!nameRegex.test(name)) {
      return res.status(400).send({ message: "Invalid category name" });
    }
    // Check if a category with the same name (case-insensitive) already exists
    const existingCategory = await categoryModal.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already added",
      });
    }
    const updatedCategory = await categoryModal.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Could not update category", error });
  }
};
//unlist category
const unlistCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { value } = req.body;
    const updatedCategory = await categoryModal.findByIdAndUpdate(
      categoryId,
      { active: value },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category unlisted",
      updatedCategory: updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not unlist category",
      error: error.message,
    });
  }
};
//get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await categoryModal.find();
    res.status(200).send({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not retrieve categories",
      error: error.message,
    });
  }
};
//get one category
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryModal.findById(categoryId);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      category: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not retrieve category",
      error: error.message,
    });
  }
};
// Get applications
const getApplications = async (req, res) => {
  try {
    const applications = await counselorModel.find({ status: "pending" });
    res.status(200).send({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get application API",
      error,
    });
  }
};
// Change status of counselor
const changeStatus = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { status } = req.body;
    const changeStatus = await counselorModel.findByIdAndUpdate(
      { _id: counselorId },
      { status },
      { new: true }
    );
    if (changeStatus.status === "active") {
      sendApprovalEmail(changeStatus.email);
    } else if (changeStatus.status === "rejected") {
      sendRejectionEmail(changeStatus.email);
    }
    console.log(changeStatus.status);
    res.status(200).send({
      success: true,
      message: "Status changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change status Api",
      error,
    });
  }
};
// Get all counselors
const getCounselors = async (req, res) => {
  try {
    const counselors = await counselorModel.find(
      { status: "active" },
      { password: 0 }
    );
    res.status(200).send({
      success: true,
      message: "Counselors featched",
      counselors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all counselors Api",
      error,
    });
  }
};
// Get specific counselor
const getCounselorProfile = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const counselors = await counselorModel.findById(counselorId);
    res.status(200).send({
      success: true,
      counselors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};
const blockCounselor = async (req, res) => {
  try {
    const { counselorId, value } = req.body;
    const counselor = await counselorModel.findByIdAndUpdate(
      { _id: counselorId },
      { isBlocked: value },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: counselor.isBlocked,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in counselor block Api",
      error,
    });
  }
};
// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" });
    res.status(200).send({
      success: true,
      message: "Users featched",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all users Api",
      error,
    });
  }
};
// BLOCK USER
const blockUsers = async (req, res) => {
  try {
    const { userId, value } = req.body;
    const user = await userModel.findByIdAndUpdate(
      { _id: userId },
      { isBlocked: value },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: user.isBlocked,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user block Api",
      error,
    });
  }
};
// GET ONE USER
const getSelectedUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.find({ _id: userId });
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getSelectedUser Api",
      error,
    });
  }
};
//FETCH WITHDRAWAL REQ
const getWithdrawals = async (req, res) => {
  try {
    const withdrawalReq = await counselorModel.find(
      { isWithdraw: true },
      { name: 1, wallet: 1, bankAC: 1, isWithdraw: 1 }
    );
    res.status(200).send({
      success: true,
      withdrawalReq,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getSelectedUser Api",
      error,
    });
  }
};
// SETTLEMENT
const settlement = async (req, res) => {
  try {
    const { counselorId } = req.body;
    const date = moment().format("DD-MM-YYYY");
    const counselor = await counselorModel.findById({ _id: counselorId });
    const amount = counselor.wallet.balance;
    counselor.wallet.balance = 0;
    counselor.isWithdraw = false;
    counselor.wallet.withdrawTransactions.push({ amount: amount, date: date });
    await counselor.save();

    res.status(200).send({
      success: true,
      message: "Amount settled successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while settling amount",
      error,
    });
  }
};
// profit chart
const profitData = async (req, res) => {
  try {
    const monthlyProfits = await bookingModel.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $project: {
          fee: 1,
          date: {
            $dateFromString: {
              dateString: "$date",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            // year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalFee: { $sum: "$fee" }, // Calculate the total fee for the month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    // Calculate profit as 80% of totalFee for each month
    const monthlyProfitsWithProfit = monthlyProfits.map((monthProfit) => ({
      ...monthProfit,
      profit: monthProfit.totalFee * 0.2,
    }));
    res.status(200).send({
      success: true,
      message: "Profits for chart fetched successfully",
      monthlyProfits: monthlyProfitsWithProfit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error occurred while calculating monthly profits",
      error,
    });
  }
};
// total users chart
const totalUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          totalActiveUsers: {
            $sum: {
              $cond: [{ $eq: ["$isBlocked", false] }, 1, 0],
            },
          },
          totalBlockedUsers: {
            $sum: {
              $cond: [{ $eq: ["$isBlocked", true] }, 1, 0],
            },
          },
        },
      },
    ]);

    if (totalUsers.length > 0) {
      const usersData = totalUsers[0];
      res.status(200).send({
        success: true,
        usersData,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Total users fethched successfully",
        totalUsers: 0,
        totalActiveUsers: 0,
        totalBlockedUsers: 0,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message:
        "We're unable to fetch user statistics right now. Please try again later.",
      error,
    });
  }
};
// total counselors chart
const totalCounselors = async (req, res) => {
  try {
    const totalCounselors = await counselorModel.aggregate([
      {
        $group: {
          _id: null,
          totalCounselors: { $sum: 1 },
          totalActiveCounselors: {
            $sum: {
              $cond: [{ $eq: ["$isBlocked", false] }, 1, 0],
            },
          },
          totalBlockedCounselors: {
            $sum: {
              $cond: [{ $eq: ["$isBlocked", true] }, 1, 0],
            },
          },
        },
      },
    ]);

    if (totalUsers.length > 0) {
      const counselorsData = totalCounselors[0];
      res.status(200).send({
        success: true,
        counselorsData,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Total users fethched successfully",
        totalCounselors: 0,
        totalActiveCounselors: 0,
        totalBlockedCounselors: 0,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message:
        "We're unable to fetch user statistics right now. Please try again later.",
      error,
    });
  }
};

module.exports = {
  addCategory,
  editCategory,
  unlistCategory,
  getCategories,
  getCategoryById,
  getApplications,
  changeStatus,
  getCounselors,
  getCounselorProfile,
  blockCounselor,
  getUsers,
  blockUsers,
  getSelectedUser,
  getWithdrawals,
  settlement,
  profitData,
  totalUsers,
  totalCounselors,
};
