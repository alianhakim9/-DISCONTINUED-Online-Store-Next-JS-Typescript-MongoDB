import { Cart } from "@/types";
import { addDecimals } from "@/utils/helper";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "cookies-ts";

const cookies = new Cookies();

type CartSliceState = {
  loading: boolean;
  cartItems: Cart[];
  itemPrice: string;
};

const initialState: CartSliceState = {
  loading: true,
  cartItems: [],
  itemPrice: "0",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemPrice = addDecimals(
        // 1 = quantity
        state.cartItems.reduce(
          (acc, item) => acc + Number(item.itemPrice) * item.quantity,
          0
        )
      );
      cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
