import { getCategories } from "@/get-data/getCategories";
import { getProducts } from "@/get-data/getProducts";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/components/pages/Homepage"), {
  ssr: false,
});

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();
  return <Homepage products={products} categories={categories} />;
}
