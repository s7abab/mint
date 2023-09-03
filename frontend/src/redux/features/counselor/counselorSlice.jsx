import { createSlice } from "@reduxjs/toolkit";
import {
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
      });
  },
});

export default counselorSlice;
