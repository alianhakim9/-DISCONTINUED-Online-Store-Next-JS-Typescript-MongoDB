import BackButton from "@/components/admin/BackButton";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProduct() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <BackButton destination="/dashboard/products" />
        <h1>Add New Product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
