import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "user/featchAllCounselors",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get("/user/users");
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

export const fetchSelectedUser = createAsyncThunk(
  "user/fetchOneUser",
  async (userId, { dispatch }) => {
    if (!userId) {
      throw new Error("Invalid userId");
    }
    try {
      const res = await Api.get(`user/user/${userId}`);
      if (res.data.success) {
        return res.data.user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Profile Photo Upload
export const uploadUserProfilePhoto = createAsyncThunk(
  "user/uploadProfilePhoto",
  async (file, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth._id; // Use userId instead of name
      const formData = new FormData();
      formData.append("image", file);
      const res = await Api.post(`user/image/${userId}`, formData); // Use userId instead of name
      if (res.data.success) {
        thunkApi.dispatch(fetchSelectedUser(userId)); // Use userId instead of name
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// Update profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ field, value, userId }, { dispatch, rejectWithValue }) => {
    // Use userId instead of name
    try {
      const res = await Api.post(`user/user/${userId}`, { field, value }); // Use userId instead of name
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(fetchSelectedUser(userId));
        return res.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("An error occurred.");
    }
  }
);

// SLICE

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(fetchSelectedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedUser.fulfilled, (state, { payload }) => {
        state.selectedUser = payload;
        state.loading = false;
      })
      .addCase(fetchSelectedUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default userSlice;
