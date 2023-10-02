import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin } from "./authActions";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  user: null,
  _id: null,
  role: null,
  token,
  error: null,
};

//auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token"); // deletes token from storage
      state.loading = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state._id = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user?.name;
      state._id = payload?.user?._id;
      state.role = payload?.user?.role;
      state.token = payload?.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.name;
      state.role = payload.role;
      state._id = payload._id;
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
