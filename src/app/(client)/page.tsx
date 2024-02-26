"use client";

import ProductCard from "@/components/client/ProductCard";
import ProductSkeletonCard from "@/components/client/ProductSkeletonCard";
import { Product } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/products?limit=10")
      .then((res: AxiosResponse) => setProducts(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    let skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductSkeletonCard key={i} />);
    }
    return <div className="grid grid-cols-5 gap-4">{skeletons}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mt-5 grid grid-cols-5 gap-2">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
