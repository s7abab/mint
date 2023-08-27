import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import toast from "react-hot-toast";

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "user/featchAllCounselors",
  async (_, { dispatch }) => {
    try {
      const res = await Api.get("/user/users");
      if (res.data.success) {
        return res.data.users;
      }
      return null;
    } catch (error) {
      console.log("Error in fetching users");
      throw error;
    }
  }
);

// Fetch selected user

export const fetchSelectedUser = createAsyncThunk(
  "user/fetchOneUser",
  async (name, { dispatch }) => {
    try {
      const res = await Api.get(`user/user/${name}`);
      if (res.data.success) {
        return res.data.user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Profile Photo Upload
export const uploadUserProfilePhoto = createAsyncThunk("user/uploadProfilePhoto",
async(file, thunkApi)=>{
  try {
    const name = thunkApi.getState().auth.user;
    const formData = new FormData();
    formData.append('image', file );
    const res = await Api.post(`user/image/${name}`, formData);
    if(res.data.success){
      thunkApi.dispatch(fetchSelectedUser(name));
      toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
) 


const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
    builder.addCase(fetchSelectedUser.fulfilled, (state, { payload }) => {
      state.selectedUser = payload;
    });
  },
});

export default userSlice;
