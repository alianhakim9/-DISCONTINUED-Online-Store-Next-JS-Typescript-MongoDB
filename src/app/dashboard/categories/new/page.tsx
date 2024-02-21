import CategoryForm from "@/components/CategoryForm";
import Link from "next/link";

export default function AddNewCategory() {
  return (
    <div className="flex flex-col gap-4 w-1/2 items-start">
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/categories"} className="default-link-btn">
          Back
        </Link>
        <h1>Add New Category</h1>
      </div>
      <CategoryForm />
    </div>
  );
}
