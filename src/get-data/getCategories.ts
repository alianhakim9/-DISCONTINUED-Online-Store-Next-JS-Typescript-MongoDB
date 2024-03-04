import { API_BASE_URL } from "@/utils/constants";
import { config } from "./config";

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`, config);
  return res.json();
}
