"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import Link from "next/link";

export type Category = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      const deleteCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const mConfirm = confirm("Delete this product?");
        if (mConfirm) {
          await axios
            .delete(`/api/categories/${category.id}`)
            .then(() => {
              showToast("Category deleted", "success");
            })
            .catch((err: AxiosError) => {
              showToast(err.message, "error");
            });
        }
      };
      return (
        <div className="flex gap-1">
          <Button variant="outline" size="sm">
            <Link href={`/dashboard/categories/edit/${category.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={deleteCategory}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
