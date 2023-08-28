import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../services/axios";

// Featch all counselors
export const fetchAllCounselors = createAsyncThunk(
  "counselor/fetchAllCounselors",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get("/admin/counselors");
      if (res.data.success) {
        return res.data.counselors;
      }
      return null;
    } catch (error) {
      console.log("Error in fetching counselors", error);
      throw error;
    }
  }
);

const counselorSlice = createSlice({
  name: "counselor",
  initialState: {
    counselors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCounselors.fulfilled, (state, { payload }) => {
      state.counselors = payload;
    });
  },
});

export default counselorSlice;
