import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Fetch Selected Counselor

export const fetchSelectedCounselor = createAsyncThunk(
  "counselorProfile/fetchCounselor",
  async (counselorId, { dispatch }) => {
    try {
      const res = await Api.get(`/counselor/profile/${counselorId}`);
      if (res.data.success) {
        return res.data.counselors;
      }
      return null;
    } catch (error) {
      console.error("Error fetching counselor:", error);
      throw error;
    }
  }
);

// Featch all counselors
export const fetchAllCounselors = createAsyncThunk(
  "counselor/fetchAllCounselors",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get("/admin/counselors");
      if (res.data.success) {
        return res.data.counselors;
      }
      return null;
    } catch (error) {
      console.log("Error in fetching counselors", error);
      throw error;
    }
  }
);

// Apply as a counselor
export const applyAsCounselor = createAsyncThunk(
  "counselor/apply",
  async (
    {
      name,
      email,
      password,
      confirmPassword,
      address,
      specialization,
      experience,
      fee,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Api.post("/counselor/apply", {
        name,
        email,
        password,
        confirmPassword,
        address,
        specialization,
        experience,
        fee,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Verify OTP
export const verifyCounselorOtp = createAsyncThunk(
  "counselor/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log(email, otp);
    try {
      const res = await Api.post("/counselor/verify-otp", { email, otp });
      if (res.data.success) {
        toast.success(res.data.message);
        const navigate = useNavigate();
        navigate("/login");
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
export const resendCounselorOtp = createAsyncThunk(
  "counselor/resend-otp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/counselor/resend-otp", { email });
      if (res.data.success) {
        toast.success("OTP Resent");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Profile Photo Upload
export const uploadCounselorProfilePhoto = createAsyncThunk(
  "counselor/uploadProfilePhoto",
  async (file, thunkApi) => {
    try {
      const counselorId = thunkApi.getState().auth._id; // Use userId instead of name
      const formData = new FormData();
      formData.append("image", file);
      const res = await Api.post(`counselor/image/${counselorId}`, formData); // Use userId instead of name
      if (res.data.success) {
        thunkApi.dispatch(fetchSelectedCounselor(counselorId)); // Use userId instead of name
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// Update profile
export const updateCounselorProfile = createAsyncThunk(
  "counselor/updateUserProfile",
  async ({ field, value, counselorId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await Api.post(`counselor/profile/${counselorId}`, {
        field,
        value,
      }); // Use userId instead of name
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(fetchSelectedCounselor(counselorId));
        return res.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("An error occurred.");
    }
  }
);
