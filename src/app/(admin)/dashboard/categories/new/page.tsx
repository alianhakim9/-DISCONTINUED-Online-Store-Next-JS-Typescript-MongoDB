import BackButton from "@/components/admin/BackButton";
import CategoryForm from "@/components/admin/CategoryForm";

export default function AddNewCategory() {
  return (
    <div className="flex flex-col gap-4 w-1/2 items-start">
      <div className="flex gap-4 items-center">
        <BackButton destination="/dashboard/categories" />
        <h1>Add New Category</h1>
      </div>
      <CategoryForm />
    </div>
  );
}
