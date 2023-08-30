import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCounselors, fetchSelectedCounselor } from "./counselorActions";

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    counselors: [],
    selectedCounselor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCounselors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCounselors.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.counselors = payload;
        state.error = null;
      })
      .addCase(fetchAllCounselors.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
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
      });
  },
});

export default counselorSlice;
