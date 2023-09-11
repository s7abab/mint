import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBookings,
  fetchCounselorsForUsers,
  fetchSelectedCounselorForUser,
  fetchSelectedUser,
  fetchSlots,
  fetchWalletAmountOfUser,
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
    isbookingAvailable: false,
    slots: [],
    selectedSlot: {
      time: null,
      date: null,
    },
    bookings: [],
    wallet: {}
  },
  reducers: {
    bookingAvailable: (state, action) => {
      state.isbookingAvailable = true;
    },
    bookingNotAvailable: (state, action) => {
      state.isbookingAvailable = false;
    },
    selectSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

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
      })

      // SCHEDULED SLOTS
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.slots = payload;
        state.error = null;
      })
      .addCase(fetchSlots.rejected, (state, { error }) => {
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
      // WALLET
      .addCase(fetchWalletAmountOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletAmountOfUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wallet = payload;
        state.error = null;
      })
      .addCase(fetchWalletAmountOfUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { bookingAvailable, bookingNotAvailable, selectSlot } =
  userSlice.actions;
export default userSlice;
