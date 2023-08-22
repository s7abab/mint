import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"

export default configureStore({
    reducer: {
        auth : authSlice.reducer
    }
})