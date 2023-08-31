import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";

//login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/auth/login", { email, password });
      //store token
      if (data.success) {
        toast.success(data.message)
        localStorage.setItem("token", data.token);
      }else{
        toast.error(data.message)
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "/auth/register",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (data.success) {
        console.log(data.message);
      } else {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        toast(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log(email, otp);
    try {
      const res = await Api.post("/auth/verify-otp", { email, otp });
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.replace("/login");
        return res?.data;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Resend OTP
export const resendOtp = createAsyncThunk(
  "auth/resend-otp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/auth/resend-otp", { email });
      if (res.data.success) {
        toast.success("OTP Resent");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_,{ rejectWithValue }) => {
    try {
      const res = await Api.get("/auth/current-user");
      if (res.data) {
        return res?.data.user
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
