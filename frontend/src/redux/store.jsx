import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import counselorSlice from "./features/counselor/counselorsSlice";
import userSlice from "./features/users/userSlice";
// import counselorProfileSlice from "./features/counselor/counselorProfileSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    // counselorProfile: counselorProfileSlice.reducer,
    counselor: counselorSlice.reducer,
    user: userSlice.reducer,
  },
});
