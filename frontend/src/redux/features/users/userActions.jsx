import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";
import endpoints from "../../../services/endpoints";
import { bookingAvailable, bookingNotAvailable } from "./userSlice";

// Fetch selected user

export const fetchSelectedUser = createAsyncThunk(
  "user/fetchSelectedUser",
  async (userid, { dispatch, rejectWithValue }) => {
    if (!userid) {
      throw new Error("Invalid userId");
    }
    try {
      const res = await Api.get(endpoints.user.fetch_selected_user + userid);
      if (res.data.success) {
        return res.data.user;
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.log(error);
      throw error;
    }
  }
);

// Profile Photo Upload
export const uploadUserProfilePhoto = createAsyncThunk(
  "user/uploadUserProfilePhoto",
  async (file, thunkApi) => {
    try {
      const userId = thunkApi.getState().auth._id;
      const formData = new FormData();
      formData.append("image", file);
      const res = await Api.post(
        endpoints.user.photo_upload + userId,
        formData
      );
      if (res.data.success) {
        thunkApi.dispatch(fetchSelectedUser(userId));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(res.data.message);
    }
  }
);

// Update profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ field, value, userId }, { dispatch, rejectWithValue }) => {
    console.log(field, value, userId);
    try {
      const res = await Api.post(endpoints.user.update_profile + userId, {
        field,
        value,
      }); // Use userId instead of name
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(fetchSelectedUser(userId));
        return res.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      toast(res.data.message);
      return rejectWithValue("An error occurred.");
    }
  }
);

// Featch all counselors
export const fetchCounselorsForUsers = createAsyncThunk(
  "user/fetchCounselorsForUsers",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get(endpoints.user.fetch_all_counselors);
      if (res.data.success) {
        return res.data.counselors;
      }
      return [];
    } catch (error) {
      toast.error("An error occurred.");
      console.log("Error in fetching counselors", error);
      throw error;
    }
  }
);

// Fetch Selected Counselor
export const fetchSelectedCounselorForUser = createAsyncThunk(
  "user/fetchSelectedCounselorForUser",
  async (counselorId, { dispatch }) => {
    try {
      const res = await Api.get(
        endpoints.user.fetch_selected_counselor + counselorId
      );
      if (res.data.success) {
        return res.data.counselors;
      }
      return null;
    } catch (error) {
      toast.error("An error occurred.");
      console.error("Error fetching counselor:", error);
      throw error;
    }
  }
);

// BOOK APPOINTMENT
export const bookAppointment = createAsyncThunk(
  "user/bookAppointment",
  async (values, { rejectWithValue }) => {
    console.log(values);
    try {
      const res = await Api.post(endpoints.user.book_appointment, {
        ...values,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
      rejectWithValue(error.message);
    }
  }
);

// FETCH SLOTS
export const fetchSlots = createAsyncThunk(
  "/user/fetchSlots",
  async ({ counselorId }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.user.fetch_slots, {
        counselorId,
      });
      if (res.data.success) {
        return res.data.slots;
      }
    } catch (error) {
      console.log(error);
      toast.error(err.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH ALL BOOKINGS
export const fetchAllBookings = createAsyncThunk(
  "/user/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.user.fetch_all_bookings);
      if (res.data.success) {
        return res.data.bookings;
      } else {
        toast.error(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// FETCH SELECTED BOOKINGS
export const fetchSelectedBookings = createAsyncThunk(
  "/user/fetchSelectedBookings",
  async (values, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.user.fetch_selected_bookings, {
        ...values,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        return res.data;
      } else {
        toast.error(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// USER CANCEL BOOKING
export const cancelBooking = createAsyncThunk(
  "/counselor/cancelBooking",
  async ({ _id, counselorId, userId, time, date}, { rejectWithValue }) => {

    try {
      const res = await Api.post(endpoints.user.cancel_booking, {
        _id, counselorId, userId, time, date
      });
      if (res.data.success) {
        toast.success(res.data.message);
        return res.data;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);
