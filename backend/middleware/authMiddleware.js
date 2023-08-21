const JWT = require ("jsonwebtoken");
const userModel = require("../models/userModel");
const counselorModel = require("../models/counselorModel");

//TOKEN CHECK AND VERIFY
const isUser = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//CHECK IS ADMIN OR NOT
const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user)
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin middleware",
      error,
    });
  }
};

//CHECK IS COUNSELOR OR NOT
const isCounselor = async (req, res, next) => {
    try {
      console.log(req.user)
      const user = await counselorModel.findById(req.user._id);
      console.log(user)
      if (user.role !== "counselor") {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        message: "Error in Counselor middleware",
        error,
      });
    }
  };

module.exports = {isUser, isAdmin, isCounselor}
