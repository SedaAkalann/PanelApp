import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import dashboardSlice from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    dashboard: dashboardSlice,
  },
});
