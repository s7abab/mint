import { createSlice } from "@reduxjs/toolkit";
import {
  getBookingData,
  getProfitDataForAdmin,
  getProfitDataForCounselor,
  getTotalCounselors,
  getTotalUsers,
} from "./dashboardActions";

const initialState = {
  monthlyProfits: null,
  bookingsData: null,
  usersData: null,
  counselorsData: null,
  loading: false,
  error: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get profit data for admin
      .addCase(getProfitDataForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfitDataForAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload)
        state.monthlyProfits = payload;
        state.error = null;
      })
      .addCase(getProfitDataForAdmin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // get total users
      .addCase(getTotalUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usersData = payload;
        state.error = null;
      })
      .addCase(getTotalUsers.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // get total counselors
      .addCase(getTotalCounselors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalCounselors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.counselorsData = payload;
        state.error = null;
      })
      .addCase(getTotalCounselors.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // get profit data for counselor
      .addCase(getProfitDataForCounselor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfitDataForCounselor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.monthlyProfits = payload;
        state.error = null;
      })
      .addCase(getProfitDataForCounselor.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // get booking data for counselor
      .addCase(getBookingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookingsData = payload;
        state.error = null;
      })
      .addCase(getBookingData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default dashboardSlice;
