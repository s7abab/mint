import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import categorySlice from "./features/category/categorySlice";
import counselorSlice from "./features/counselor/counselorSlice";
import userSlice from "./features/users/userSlice";
import adminSlice from "./features/admin/adminSlice";
import messageSlice from "../redux/features/message/messageSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    counselor: counselorSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    message: messageSlice.reducer,
  },
});
