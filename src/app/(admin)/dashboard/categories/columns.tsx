"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <Dialog>
            <DialogTrigger>
              <Button type="button" variant="destructive" size="sm">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to
                  permanently delete this data from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={deleteCategory}
                  size="sm"
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
