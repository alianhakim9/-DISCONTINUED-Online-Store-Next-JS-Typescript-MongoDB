"use client";

import { Cart } from "@/types";
import { createContext } from "react";

const defaultValue: Cart[] = [];

export const CartContext = createContext(defaultValue);
