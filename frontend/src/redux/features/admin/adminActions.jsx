import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";
import endpoints from "../../../services/endpoints";

// Approve or reject counselors
export const changeStatus = createAsyncThunk(
  "/admin/status",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.admin.change_status + userId, {
        status,
      });
      if (res.data.success) {
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
    console.log(userId);
    try {
      const res = await Api.post(endpoints.admin.block_user, {
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
    console.log(counselorId, value);
    try {
      const res = await Api.post(endpoints.admin.block_counselor, {
        counselorId,
        value: !value,
      });
      if (res.data.success) {
        dispatch(fetchCounselorsForAdmin());
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

// Featch all counselors
export const fetchCounselorsForAdmin = createAsyncThunk(
  "counselor/fetchAllCounselors",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get(endpoints.admin.fetch_all_counselors);
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

// Fetch Selected Counselor
export const fetchSelectedCounselorForAdmin = createAsyncThunk(
  "counselorProfile/fetchCounselor",
  async (counselorId, { dispatch }) => {
    try {
      const res = await Api.get(
        endpoints.admin.fetch_selected_counselor + counselorId
      );
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
// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "user/featchAllUsers",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get(endpoints.admin.fetch_all_users);
      if (res.data.success) {
        return res.data.users;
      }
      return null;
    } catch (error) {
      console.log("Error in fetching users");
      throw error;
    }
  }
);
// Fetch selected user
export const fetchSelectedUserForAdmin = createAsyncThunk(
  "admin/fetchOneUser",
  async (userId, { dispatch }) => {
    if (!userId) {
      throw new Error("Invalid userId");
    }
    try {
      const res = await Api.get(endpoints.admin.fetch_selected_user + userId);
      if (res.data.success) {
        return res.data.user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
