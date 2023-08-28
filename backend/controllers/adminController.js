const categoryModal = require("../models/categoryModel");
const counselorModel = require("../models/counselorModel");
const sendOTPEmail = require("../utils/OTPVerification");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ message: "Fill the field" });
    }
    //existing category
    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already added",
      });
    }
    //save category
    const category = new categoryModal({ name });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category created succussfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in category",
      error,
    });
  }
};

//edit category
const editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

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
      { status }
    );
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
    const counselors = await counselorModel.find({ status: "active" });
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

module.exports = {
  addCategory,
  editCategory,
  unlistCategory,
  getCategories,
  getCategoryById,
  getApplications,
  changeStatus,
  getCounselors,
  blockCounselor,
};
