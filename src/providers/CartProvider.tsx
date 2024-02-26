"use client";

import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICartProvider {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: ICartProvider) => {
  const [cart, setCart] = useState<Cart[]>();

  const router = useRouter();

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

  const addToCart = async (product: Product) => {
    const isItemExists = cart?.find((i) => i.product === product);

    let newCartItems;

    if (isItemExists) {
      newCartItems = cart?.map((i) =>
        i.product === isItemExists.product ? product : i
      );
    } else {
      newCartItems = [...(cart || []), product];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify({
        cart: newCartItems,
      })
    );

    setCartToState();
  };

  if (cart) {
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
  }

  return <div>{children}</div>;
};
