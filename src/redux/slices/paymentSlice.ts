import { createSlice } from "@reduxjs/toolkit";

type PaymentSliceState = {
  transactionToken: string;
};

const initialState: PaymentSliceState = {
  transactionToken: "",
};

const paymentSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTransactionToken: (state, action) => {
      state.transactionToken = action.payload;
    },
  },
});

export const { setTransactionToken } = paymentSlice.actions;

export default paymentSlice.reducer;
