"use client";

import BackButton from "@/components/admin/BackButton";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then((response: AxiosResponse) => {
      setProduct(response.data);
    });
  });

  if (!product) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <BackButton destination="/dashboard/products" />
        <h1>Edit Product Data</h1>
      </div>
      {product && <ProductForm product={product} />}
    </div>
  );
}
