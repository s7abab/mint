import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSlot,
  fetchAllBookings,
  fetchScheduledSlots,
  fetchSelectedCounselor,
} from "./counselorActions";

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    selectedCounselor: null,
    loading: false,
    error: null,
    slots: [],
    bookings: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedCounselor.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.selectedCounselor = payload;
        state.error = null;
      })
      .addCase(fetchSelectedCounselor.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })

      // SCHEDULED SLOTS
      .addCase(fetchScheduledSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScheduledSlots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.slots = payload;
        state.error = null;
      })
      .addCase(fetchScheduledSlots.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // ALL BOOKINGS
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = payload;
        state.error = null;
      })
      .addCase(fetchAllBookings.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { createSlot } = counselorSlice.actions;
export default counselorSlice;
