import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUsers,
  fetchCounselorsForUsers,
  fetchSelectedCounselorForUser,
  fetchSelectedUser,
} from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
    counselors: [],
    selectedCounselor: null,
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
      // Fetch selected user
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
      })
      // Fetch counselors
      .addCase(fetchCounselorsForUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounselorsForUsers.fulfilled, (state, { payload }) => {
        state.counselors = payload;
        state.loading = false;
      })
      .addCase(fetchCounselorsForUsers.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      // Fetch selected counselor
      .addCase(fetchSelectedCounselorForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSelectedCounselorForUser.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.selectedCounselor = payload;
          state.error = null;
        }
      )
      .addCase(fetchSelectedCounselorForUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default userSlice;
