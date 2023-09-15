import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";
import endpoints from "../../../services/endpoints";

// Fetch Selected Counselor
export const fetchSelectedCounselor = createAsyncThunk(
  "counselor/fetchSelectedCounselor",
  async (counselorId, { dispatch }) => {
    try {
      const res = await Api.get(
        endpoints.counselor.fetch_selected_counselor + counselorId
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

// Apply as a counselor
export const applyAsCounselor = createAsyncThunk(
  "counselor/applyAsCounselor",
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
      const { data } = await Api.post(endpoints.counselor.apply_counselor, {
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
      toast.error("An error occurred.");
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Verify OTP
export const verifyCounselorOtp = createAsyncThunk(
  "counselor/verifyCounselorOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log(email, otp);
    try {
      const res = await Api.post(endpoints.counselor.verify_OTP, {
        email,
        otp,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.replace("/");
        navigate("/login");
        return res?.data;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Resend OTP
export const resendCounselorOtp = createAsyncThunk(
  "counselor/resendCounselorOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.resend_OTP, { email });
      if (res.data.success) {
        toast.success("OTP Resent");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Profile Photo Upload
export const uploadCounselorProfilePhoto = createAsyncThunk(
  "counselor/uploadCounselorProfilePhoto",
  async (file, thunkApi) => {
    try {
      const counselorId = thunkApi.getState().auth._id; // Use userId instead of name
      const formData = new FormData();
      formData.append("image", file);
      const res = await Api.post(
        endpoints.counselor.photo_upload + counselorId,
        formData
      ); // Use userId instead of name
      if (res.data.success) {
        thunkApi.dispatch(fetchSelectedCounselor(counselorId)); // Use userId instead of name
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);

      console.log(error);
    }
  }
);

// Update profile
export const updateCounselorProfile = createAsyncThunk(
  "counselor/updateCounselorProfile",
  async ({ values, counselorId }, { dispatch, rejectWithValue }) => {
    try {
      console.log(values);
      const res = await Api.post(
        endpoints.counselor.update_profile + counselorId,
        {
          values,
        }
      );
      if (res.data.success) {
        toast.success("Profile Updated");
        dispatch(fetchSelectedCounselor(counselorId));
        return res.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);

      return rejectWithValue("An error occurred.");
    }
  }
);

// Update time
export const updateTime = createAsyncThunk(
  "counselor/updateTime",
  async ({ timings, counselorId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await Api.post(
        endpoints.counselor.update_time + counselorId,
        {
          timings,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(fetchSelectedCounselor(counselorId));
        return res.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);

      return rejectWithValue("An error occurred.");
    }
  }
);

// CREATE SLOT
export const createSlot = createAsyncThunk(
  "counselor/createSlot",
  async ({ date, time, counselorId }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.create_slot, {
        date,
        time,
        counselorId,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH SCHEDULED SLOTS
export const fetchScheduledSlots = createAsyncThunk(
  "/counselor/fetchScheduledSlots",
  async ({ counselorId }, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.fetch_slots, {
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

// CANCEL BOOKING
export const cancelBooking = createAsyncThunk(
  "/counselor/cancelBooking",
  async (values, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.cancel_booking, {
        ...values,
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

// DELETE SLOT
export const deleteSlot = createAsyncThunk(
  "/counselor/deleteSlot",
  async ({ _id, counselorId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await Api.post(endpoints.counselor.delete_slot, {
        _id,
        counselorId,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        return res.data._id;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

// FETCH ALL BOOKINGS
export const fetchAllBookings = createAsyncThunk(
  "/counselor/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.fetch_all_bookings);
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
  "/counselor/fetchSelectedBookings",
  async (values, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.fetch_selected_bookings, {
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

// Fetch wallet amount
export const fetchWalletAmountOfCounselor = createAsyncThunk(
  "/counselor/fetchWalletAmountOfCounselor",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get(endpoints.counselor.fetch_wallet);
      if (res.data.success) {
        return res.data.wallet;
      } else {
        toast.error("Something went wrong");
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

// CHANGE BANK DETAILS
export const changeBankDetails = createAsyncThunk(
  "/counselor/changeBankDetails",
  async (values, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.changeBankDetails, {
        ...values,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }
);

// FETCH BANK DETAILS
export const fetchBankDetails = createAsyncThunk(
  "/counselor/fetchBankDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.post(endpoints.counselor.fetchBankDetails);
      if (res.data.success) {
        return res.data.bankAc;
      } else {
        rejectWithValue(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      rejectWithValue(error.response.data.error);
    }
  }
);

// WITHDRAW REQ
export const withdrawReq = createAsyncThunk(
  "/counselor/withdrawReq",
  async (_, { thunkApi }) => {
    try {
      const res = await Api.post(endpoints.counselor.withdrawReq);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.err(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// SESSION COMPLETED
export const sessionCompleted = createAsyncThunk(
  "/counselor/sessionCompleted",
  async (bookingId, { thunkApi }) => {
    try {
      const res = await Api.post(endpoints.counselor.session_completed, {
        bookingId,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);
