import ProductDetail from "@/components/pages/ProductDetail";
import { getProductById } from "@/get-data/getProducts";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const productId = params.productId;
  const product = await getProductById(productId);

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail product={product} />;
    </Suspense>
  );
}
