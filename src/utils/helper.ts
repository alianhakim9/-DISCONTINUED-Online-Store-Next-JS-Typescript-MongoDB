import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { toast as sonnerToast } from "sonner";

import * as crypto from "crypto";

export function showToast(message: string, type: "success" | "error") {
  if (type === "success") {
    toast.success(message, { position: "bottom-right" });
  } else {
    toast.error(message, { position: "bottom-right" });
  }
}

export function showSonnerToast(message: string, description?: string) {
  sonnerToast(message, {
    description: description,
  });
}

export function onSignOut(callbackUrl?: string) {
  return signOut({ callbackUrl, redirect: true });
}

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export function generateOrderId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "order_";
  for (let i = 0; i < 10; i++) {
    orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return orderId;
}

export function generateSHA512(input: string): string {
  const hash = crypto.createHash("sha512");
  hash.update(input);
  return hash.digest("hex");
}
