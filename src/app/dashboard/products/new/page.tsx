import ProductForm from "@/components/ProductForm";
import Link from "next/link";

export default function NewProduct() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/products"} className="default-link-btn">
          Back
        </Link>
        <h1>Add New Product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
