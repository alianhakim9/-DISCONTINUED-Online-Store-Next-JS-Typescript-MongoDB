"use client";

import { columns } from "@/app/(admin)/dashboard/products/columns";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

interface IProductsPage {
  products: Product[];
}

const ProductsPage = ({ products }: IProductsPage) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>List Product</h1>
        <Button onClick={() => router.push("/dashboard/products/new")}>
          Add New Product
        </Button>
      </div>
      {products && (
        <div className="mt-5">
          <DataTable columns={columns} data={products} showSearch />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
