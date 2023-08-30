import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import counselorSlice from "./features/counselor/counselorSlice";
import userSlice from "./features/users/userSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    counselor: counselorSlice.reducer,
    user: userSlice.reducer,
  },
});
