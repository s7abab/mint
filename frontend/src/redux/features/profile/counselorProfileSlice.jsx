import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";

export const fetchCounselor = createAsyncThunk(
  "counselorProfile/fetchCounselor",
  async (counselorId, { dispatch  }) => {
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

const counselorProfileSlice = createSlice({
  name: "counselorProfile",
  initialState: {
    name: null,
    email: null,
    address: null,
    specialization: null,
    experience: null,
    fee: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCounselor.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default counselorProfileSlice;
