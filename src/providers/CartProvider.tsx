"use client";

import { CartContext } from "@/context/CartContext";
import { Cart } from "@/types";
import { useEffect, useState } from "react";

interface ICartProvider {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: ICartProvider) => {
  const [cart, setCart] = useState<Cart[]>();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    if (localStorage.getItem("cart")) {
      setCart(
        localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart")!)
          : []
      );
    }
  };

  if (cart) {
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
  }

  return <div>{children}</div>;
};
