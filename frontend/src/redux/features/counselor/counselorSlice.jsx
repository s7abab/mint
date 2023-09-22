import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBookings,
  fetchBankDetails,
  fetchScheduledSlots,
  fetchSelectedCounselor,
  fetchSelectedUser,
  fetchWalletAmountOfCounselor,
} from "./counselorActions";

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    selectedCounselor: null,
    loading: false,
    error: null,
    slots: [],
    wallet: {},
    bookings: [],
    bankAC: [],
    selectedUser: [],
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
      })
      // FETCH WALLET
      .addCase(fetchWalletAmountOfCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletAmountOfCounselor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wallet = payload;
        state.error = null;
      })
      .addCase(fetchWalletAmountOfCounselor.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // FETCH BANK DETAILS
      .addCase(fetchBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBankDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bankAC = payload;
        state.error = null;
      })
      .addCase(fetchBankDetails.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // FETCH USER
      .addCase(fetchSelectedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (!state.selectedUser.some((item) => item.name === payload.name)) {
          state.selectedUser = [...state.selectedUser, payload];
        }
        state.error = null;
      })
      .addCase(fetchSelectedUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { createSlot } = counselorSlice.actions;
export default counselorSlice;
