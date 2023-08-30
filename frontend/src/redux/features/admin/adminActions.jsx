import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import { fetchAllUsers } from "../users/userActions";
import toast from "react-hot-toast";
import { fetchAllCounselors } from "../counselor/counselorActions";

// Approve or reject counselors
export const changeStatus = createAsyncThunk(
  "/admin/status",
  async ({ userId, status }, { rejectWithValue }) => {
    console.log(userId);
    try {
      const res = await Api.post(`admin/status/${userId}`, { status });
      if (res.data.success) {
        window.location.replace("/admin/applications");
        return res.data;
      } else {
        rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occur in change status Api");
    }
  }
);

// Block user
export const blockUser = createAsyncThunk(
  "/admin/users",
  async ({ userId, value }, { rejectWithValue, dispatch }) => {
    console.log(userId, value)
    try {
      const res = await Api.post("/admin/users", {
        userId,
        value: !value,
      });
      if (res.data.success) {
        dispatch(fetchAllUsers());
        if (res.data.message) {
          toast.success("Blocked");
        } else {
          toast.success("Unblocked");
        }
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

// Block counselor
export const blockCounselor = createAsyncThunk(
  "/admin/counselors",
  async ({ counselorId, value }, { rejectWithValue, dispatch }) => {
    console.log(counselorId, value)
    try {
      const res = await Api.post("/admin/counselors", {
        counselorId,
        value: !value,
      });
      if (res.data.success) {
        dispatch(fetchAllCounselors());
        if (res.data.message) {
          toast.success("Blocked");
        } else {
          toast.success("Unblocked");
        }
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
