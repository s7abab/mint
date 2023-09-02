import { createSlice } from "@reduxjs/toolkit";
import {
  changeStatus,
  fetchAllUsers,
  fetchCounselorsForAdmin,
  fetchSelectedCounselorForAdmin,
  fetchSelectedUserForAdmin,
} from "./adminActions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    counselors: [],
    users: [],
    selectedCounselor: null,
    selectedUser: null,
    status: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
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
      // Fetch all counselors
      .addCase(fetchCounselorsForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounselorsForAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.counselors = payload;
        state.error = null;
      })
      .addCase(fetchCounselorsForAdmin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // Fetch selected counselor
      .addCase(fetchSelectedCounselorForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSelectedCounselorForAdmin.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.selectedCounselor = payload;
          state.error = null;
        }
      )
      .addCase(fetchSelectedCounselorForAdmin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // Change status
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.status = payload;
        state.error = null;
      })
      .addCase(changeStatus.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // Fetch selected user
      .addCase(fetchSelectedUserForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectedUserForAdmin.fulfilled, (state, { payload }) => {
        state.selectedUser = payload;
        state.loading = false;
      })
      .addCase(fetchSelectedUserForAdmin.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default adminSlice;
