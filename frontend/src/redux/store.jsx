import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import counselorProfileSlice from "./features/profile/counselorProfileSlice";
import counselorSlice from "./features/users/counselorsSlice";
import userSlice from "./features/users/userSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    counselorProfile: counselorProfileSlice.reducer,
    counselors: counselorSlice.reducer,
    user: userSlice.reducer,
  },
});
