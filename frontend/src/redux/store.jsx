import {configureStore} from "@reduxjs/toolkit"
import alertSlice from "./features/alertSlice"
import authSlice from "./features/authSlice"

export default configureStore({
    reducer: {
        alerts : alertSlice,
        auth : authSlice
    }
})