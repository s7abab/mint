import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import endpoints from "../../../services/endpoints";
import toast from "react-hot-toast";

// admin
export const getProfitDataForAdmin = createAsyncThunk(
  "admin/getProfitDataForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.admin.get_profit_data);
      if (res.data.success) {
        return res.data.monthlyProfits;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
      toast.error(error.message);
    }
  }
);
export const getTotalUsers = createAsyncThunk(
  "admin/getTotalUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.admin.get_total_users);
      if (res.data.success) {
        return res.data.usersData;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
      toast.error(error.message);
    }
  }
);
export const getTotalCounselors = createAsyncThunk(
  "admin/getTotalCounselors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.admin.get_total_counselors);
      if (res.data.success) {
        return res.data.counselorsData;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
      toast.error(error.message);
    }
  }
);

// counselor
export const getProfitDataForCounselor = createAsyncThunk(
  "counselor/getProfitDataForCounselor",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.counselor.get_profit_data);
      if (res.data.success) {
        return res.data.monthlyProfits;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
      toast.error(error.message);
    }
  }
);
export const getBookingData = createAsyncThunk(
  "counselor/getBookingData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.counselor.get_booking_data);
      if (res.data.success) {
        return res.data.bookingsData;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
      toast.error(error.message);
    }
  }
);
