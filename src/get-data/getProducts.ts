import { API_BASE_URL } from "@/utils/constants";
import { config } from "./config";

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products?limit=10`, config);
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, config);
  return res.json();
}
