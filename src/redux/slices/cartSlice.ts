import { Cart } from "@/types";
import { addDecimals } from "@/utils/helper";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type CartSliceState = {
  loading: boolean;
  cartItems: Cart[];
  itemPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

const initialState: CartSliceState = Cookies.get("cart")
  ? {
      ...JSON.parse(Cookies.get("cart") || "[]"),
      loading: true,
    }
  : {
      loading: true,
      cartItems: [],
      itemPrice: 0,
      shippingPrice: 0,
      totalPrice: 0,
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
      state.cartItems.map((x) => {
        Number(addDecimals(x.itemPrice > 100 ? 0 : 100));
      });
      state.itemPrice = Number(
        addDecimals(
          state.cartItems.reduce(
            (acc, item) => acc + Number(item.itemPrice) * item.quantity,
            0
          )
        )
      );
      state.totalPrice = (Number(state.itemPrice), Number(state.shippingPrice));
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
