"use client";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>();
  const router = useRouter();

  const fetchCategories = useCallback(() => {
    axios
      .get("/api/categories")
      .then((response: AxiosResponse) => {
        setCategories(response.data);
      })
      .catch((err: AxiosError) => {
        showToast(err.message, "error");
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>List Category</h1>
        <Button onClick={() => router.push("/dashboard/categories/new")}>
          Add New Category
        </Button>
      </div>
      {categories && (
        <div className="mt-5">
          <DataTable columns={columns} data={categories} showSearch={false} />
        </div>
      )}
    </div>
  );
}
