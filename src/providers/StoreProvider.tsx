"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface IStoreProvider {
  children: React.ReactNode;
}

export function StoreProvider({ children }: IStoreProvider) {
  return <Provider store={store}>{children}</Provider>;
}
