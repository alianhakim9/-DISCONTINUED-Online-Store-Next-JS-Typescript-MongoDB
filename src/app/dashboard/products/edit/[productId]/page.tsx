"use client";

import ProductForm from "@/components/ProductForm";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
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
        <Link href={"/dashboard/products"} className="default-link-btn">
          Back
        </Link>
        <h1>Edit Product Data</h1>
      </div>
      {product && <ProductForm product={product} />}
    </div>
  );
}
