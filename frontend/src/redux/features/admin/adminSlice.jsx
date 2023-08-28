import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";

export const changeStatus = createAsyncThunk(
  "/admin/status",
  async ({ userId, status }, { rejectWithValue }) => {
    console.log(userId);
    try {
      const res = await Api.post(`admin/status/${userId}`, { status });
      if (res.data.success) {
        window.location.replace("/admin/applications")
        return res.data;
      } else {
        rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occur in change status Api");
    }
  }
);
