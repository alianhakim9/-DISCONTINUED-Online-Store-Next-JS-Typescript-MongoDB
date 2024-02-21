"use client";

import { showToast } from "@/utils/helper";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface ICategoryProps {
  category?: Category;
}

const CategoryForm = ({ category }: ICategoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(category?.name || "");

  const storeCategory = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: name,
    };
    if (category) {
      await axios
        .put(`/api/categories/${category.id}`, data)
        .then(() => {
          showToast("Category saved", "success");
        })
        .catch((err: AxiosError) => {
          showToast(err.message, "error");
        })
        .finally(() => setIsLoading(false));
    } else {
      await axios
        .post("/api/categories", data)
        .then(() => {
          showToast("Category added", "success");
          setName("");
        })
        .catch((err: AxiosError) => showToast(err.message, "error"))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className="flex flex-col mt-5 w-1/2" onSubmit={storeCategory}>
      <label htmlFor="name">Category Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn-black btn-disabled"
        type="submit"
        disabled={isLoading}
      >
        Save
      </button>
    </form>
  );
};

export default CategoryForm;
