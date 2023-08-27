import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";

//login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/auth/login", { email, password });
      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "/auth/register",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const { data } = await Api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await Api.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) { 
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
