"use client";

import EmptyState from "@/components/admin/EmptyState";
import { showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>();

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

  const deleteCategory = async (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    e.preventDefault();
    const mConfirm = confirm("Delete this category?");
    if (mConfirm) {
      await axios
        .delete(`/api/categories/${categoryId}`)
        .then(() => {
          showToast("Category deleted", "success");
          fetchCategories();
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>List Category</h1>
        <Link className="btn-black" href="/dashboard/categories/new">
          Add New Category
        </Link>
      </div>
      <table className="table-auto border border-slate-200 w-full mt-4">
        <thead className="bg-black text-white">
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>User Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category, index) => (
              <tr key={category.id}>
                <td className={` text-center`}>{index + 1}</td>
                <td>{category.name}</td>
                <td className={`text-center`}>
                  <Link href={`/dashboard/categories/edit/${category.id}`}>
                    Edit
                  </Link>
                  <button
                    className="ml-4"
                    onClick={(e) => deleteCategory(e, category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {categories?.length === 0 && (
            <tr>
              <td colSpan={5}>
                <EmptyState
                  title="Category is empty, Add new category"
                  actionTitle="here"
                  destination="/dashboard/categories/new"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
