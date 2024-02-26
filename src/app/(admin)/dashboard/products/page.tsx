"use client";

// import CheckBox from "@/components/Checkbox";
import EmptyState from "@/components/admin/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Product() {
  // @ts-ignore
  const [products, setProducts] = useState<Product[]>();
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [limit, setLimit] = useState(5);
  const router = useRouter();

  const [page, setPage] = useState(1);

  const fetchProducts = useDebouncedCallback((query, limit, orderBy, page) => {
    const url = "/api/products";
    if (query) {
      axios
        .get(`${url}?q=${query}&order=${orderBy}&limit=${limit}&page=${page}`)
        .then((response: AxiosResponse) => {
          setProducts(response.data);
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    } else {
      axios
        .get(`${url}?order=${orderBy}&page=${page}&limit=${limit}`)
        .then((response: AxiosResponse) => {
          setProducts(response.data);
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    }
  }, 300);

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

  useEffect(() => {
    fetchProducts(query, limit, orderBy, page);
  }, [fetchProducts, limit, orderBy, page, query]);

  const deleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    const mConfirm = confirm("Delete this product?");
    if (mConfirm) {
      await axios
        .delete(`/api/products/${productId}`)
        .then(() => {
          showToast("Product deleted", "success");
          fetchProducts(query, limit, orderBy, page);
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    }
  };

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
          <DataTable columns={columns} data={products} />
        </div>
      )}
    </div>
  );
}
