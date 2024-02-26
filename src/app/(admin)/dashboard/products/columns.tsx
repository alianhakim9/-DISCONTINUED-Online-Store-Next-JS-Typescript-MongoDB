"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FaArrowsUpDown } from "react-icons/fa6";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  stock: number;
  category: {
    id: string;
    name: string;
  };
};

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
          <Button variant="destructive" size="sm" onClick={deleteProduct}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
