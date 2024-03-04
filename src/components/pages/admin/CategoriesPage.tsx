"use client";

import { columns } from "@/app/(admin)/dashboard/categories/columns";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { useRouter } from "next/navigation";

interface ICategories {
  categories: Category[];
}

const CategoriesPage = ({ categories }: ICategories) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>List Category</h1>
        <Button onClick={() => router.push("/dashboard/categories/new")}>
          Add New Category
        </Button>
      </div>
      {categories && (
        <div className="mt-5">
          <DataTable columns={columns} data={categories} showSearch={false} />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
