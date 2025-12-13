import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/AdminAuthSlices/adminAuthSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
