import { getCategories } from "@/get-data/getCategories";
import dynamic from "next/dynamic";

const CategoriesPage = dynamic(
  () => import("@/components/pages/admin/CategoriesPage"),
  {
    ssr: false,
  }
);

export default async function Categories() {
  const categories = await getCategories();
  return <CategoriesPage categories={categories} />;
}
