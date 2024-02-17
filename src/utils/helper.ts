import toast from "react-hot-toast";

export function showToast(message: string, type: "success" | "error") {
  if (type === "success") {
    toast.success(message, { position: "bottom-right" });
  } else {
    toast.error(message, { position: "bottom-right" });
  }
}
