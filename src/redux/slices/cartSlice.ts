import { Product, Quantity, SubTotal } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type CartSliceState = {
  loading: boolean;
  cartItems: Product[];
  totalPrice: number;
  subTotal: SubTotal[];
  quantity: Quantity[];
};

const initialState: CartSliceState = Cookies.get("cart")
  ? {
      ...JSON.parse(Cookies.get("cart") || "[]"),
      loading: true,
    }
  : {
      loading: true,
      cartItems: [],
      totalPrice: 0,
      subTotal: [],
      quantity: [],
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
        state.subTotal.push({
          id: item.id,
          count: item.subTotal,
        });
        state.quantity.push({
          id: item.id,
          count: item.quantity,
        });
        state.cartItems = [...state.cartItems, item];
      }
      // state.cartItems.map((x) => {
      //   Number(addDecimals(Number(x.price) > 100 ? 0 : 100));
      // });
      let total = 0;
      state.cartItems.map((x) => {
        total += x.subTotal;
        return total;
      });
      state.totalPrice = total;
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      let total = 0;
      state.cartItems = state.cartItems.filter((x) => {
        if (x.id === action.payload) {
          total = state.totalPrice - x.subTotal;
        }
        return x.id !== action.payload;
      });
      state.subTotal = state.subTotal.filter((y) => {
        return y.id !== action.payload;
      });
      state.quantity = state.quantity.filter((qty) => {
        return qty.id !== action.payload;
      });
      state.totalPrice = total;
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addQuantity: (state, action) => {
      state.quantity = state.quantity.map((qty) => {
        if (qty.id === action.payload.id) {
          return {
            ...qty,
            count: qty.count + 1,
          };
        } else {
          return qty;
        }
      });
      state.cartItems.map((item) => {
        let total = 0;
        state.subTotal = state.subTotal.map((subTotal, index) => {
          if (subTotal.id === item.id) {
            return {
              ...subTotal,
              count: Number(item.price) * state.quantity[index].count,
            };
          } else {
            return subTotal;
          }
        });
        if (item.id === action.payload.id) {
          total = state.totalPrice + item.subTotal;
          state.totalPrice = total;
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: Number(item.price) * action.payload.quantity,
          };
        } else {
          return item;
        }
      });
      Cookies.set("cart", JSON.stringify(state));
    },
    reduceQuantity: (state, action) => {
      state.quantity = state.quantity.map((qty) => {
        if (qty.id === action.payload.id) {
          return {
            ...qty,
            count: qty.count - 1,
          };
        } else {
          return qty;
        }
      });
      state.cartItems.map((item) => {
        let total = 0;
        state.subTotal = state.subTotal.map((subTotal, index) => {
          if (subTotal.id === item.id) {
            return {
              ...subTotal,
              count: Number(item.price) * state.quantity[index].count,
            };
          } else {
            return subTotal;
          }
        });
        if (item.id === action.payload.id) {
          total = state.totalPrice - item.subTotal;
          state.totalPrice = total;
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: Number(item.price) * action.payload.quantity,
          };
        } else {
          return item;
        }
      });
      Cookies.set("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  hideLoading,
  addQuantity,
  reduceQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
