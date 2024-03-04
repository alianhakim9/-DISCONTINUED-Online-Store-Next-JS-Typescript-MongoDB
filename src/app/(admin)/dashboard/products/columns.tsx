"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FaArrowsUpDown } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Product } from "@/types";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <FaArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const mConfirm = confirm("Delete this product?");
        if (mConfirm) {
          await axios
            .delete(`/api/products/${product.id}`)
            .then(() => {
              showToast("Product deleted", "success");
            })
            .catch((err: AxiosError) => {
              showToast(err.message, "error");
            });
        }
      };
      return (
        <div className="flex gap-1">
          <Button variant="outline" size="sm">
            <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link>
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
                <Button variant="destructive" onClick={deleteProduct} size="sm">
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
