import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import paymentSlice from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    payment: paymentSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
