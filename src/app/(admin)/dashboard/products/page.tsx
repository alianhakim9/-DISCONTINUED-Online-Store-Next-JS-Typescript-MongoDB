// import { Button } from "@/components/ui/button";
// import { showToast } from "@/utils/helper";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import { DataTable } from "../../../../components/admin/DataTable";
// import { columns } from "./columns";
import { getProducts } from "@/get-data/getProducts";
import dynamic from "next/dynamic";

const ProductsDetailPage = dynamic(
  () => import("@/components/pages/admin/ProductsPage"),
  {
    ssr: false,
  }
);

export default async function Page() {
  // @ts-ignore
  // const [products, setProducts] = useState<Product[]>();
  // const [query, setQuery] = useState("");
  // const [orderBy, setOrderBy] = useState("desc");
  // const [limit, setLimit] = useState(5);
  // const router = useRouter();

  // const [page, setPage] = useState(1);

  // const fetchProducts = useDebouncedCallback((query, limit, orderBy, page) => {
  //   const url = "/api/products";
  //   if (query) {
  //     axios
  //       .get(`${url}?q=${query}&order=${orderBy}&limit=${limit}&page=${page}`)
  //       .then((response: AxiosResponse) => {
  //         setProducts(response.data);
  //       })
  //       .catch((err: AxiosError) => {
  //         showToast(err.message, "error");
  //       });
  //   } else {
  //     axios
  //       .get(`${url}?order=${orderBy}&page=${page}&limit=${limit}`)
  //       .then((response: AxiosResponse) => {
  //         setProducts(response.data);
  //       })
  //       .catch((err: AxiosError) => {
  //         showToast(err.message, "error");
  //       });
  //   }
  // }, 300);

  // const fetchProducts = useCallback(() => {
  //   const url = "/api/products";
  //   console.log(query);
  //   if (query) {
  //     axios
  //       .get(`${url}?q=${query}&order=${orderBy}&limit=${limit}`)
  //       .then((response: AxiosResponse) => {
  //         setProducts(response.data);
  //       })
  //       .catch((err: AxiosError) => {
  //         showToast(err.message, "error");
  //       });
  //   } else {
  //     axios
  //       .get(`${url}?order=${orderBy}&page=${page}&limit=${limit}`)
  //       .then((response: AxiosResponse) => {
  //         setProducts(response.data);
  //       })
  //       .catch((err: AxiosError) => {
  //         showToast(err.message, "error");
  //       });
  //   }
  // }, [limit, orderBy, page, query]);

  // useEffect(() => {
  //   fetchProducts(query, limit, orderBy, page);
  // }, [fetchProducts, limit, orderBy, page, query]);

  const products = await getProducts();
  return <ProductsDetailPage products={products} />;
}
