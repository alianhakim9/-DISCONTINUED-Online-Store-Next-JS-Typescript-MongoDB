"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategory() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}`)
      .then((response: AxiosResponse) => {
        setCategory(response.data);
      });
  });

  if (!category) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/categories"} className="default-link-btn">
          Back
        </Link>
        <h1>Edit Product Data</h1>
      </div>
      {category && (
        <div className="w-1/2">
          <CategoryForm category={category} />
        </div>
      )}
    </div>
  );
}
