"use client";

import { createContext } from "react";

const defaultValue: Cart[] = [];

export const CartContext = createContext(defaultValue);
