import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";

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

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    counselors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCounselors.fulfilled, (state, { payload }) => {
      state.counselors = payload;
    });
  },
});

export default counselorSlice;
