"use client";

import { PRODUCT_IMG_PATH } from "@/utils/constants";
import { showToast } from "@/utils/helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProductProps {
  product?: Product;
}

const ProductForm = ({ product }: ProductProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || []
  );
  const [categories, setCategories] = useState<Category[]>();
  const [categoryId, setCategoryId] = useState<string>();

  const router = useRouter();

  const fetchCategories = useCallback(() => {
    axios
      .get("/api/categories")
      .then((response: AxiosResponse) => setCategories(response.data));
  }, []);

  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
    }
    fetchCategories();
  }, [fetchCategories, product]);

  const storeProduct = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (categoryId) formData.append("categoryId", categoryId);
    existingImages.forEach((image) => {
      formData.append("existingImages", image);
    });
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });
    }
    setIsLoading(true);
    if (product?.id) {
      // update current product
      await axios
        .put(`/api/products/${product.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          showToast("Product updated", "success");
          setSelectedFiles(null);
        })
        .catch((error: AxiosError) => {
          toast.error(error.message, { position: "bottom-right" });
        })
        .finally(() => setIsLoading(false));
    } else {
      // save new product
      await axios
        .post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          showToast("Product added", "success");
          setIsLoading(false);
          emptyInputState();
        })
        .catch((error: AxiosError) => {
          showToast(error.message, "error");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const emptyInputState = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSelectedFiles(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFiles(e.target.files);
  };

  const deleteImage = async (fileName: string) => {
    if (confirm("Are you sure want delete this image?")) {
      await axios
        .delete("/api/products/images", {
          data: {
            fileName,
            productId: product?.id,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          router.refresh();
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
  };

  return (
    <form
      onSubmit={storeProduct}
      encType="multipart/form-data"
      className="w-full mt-5"
    >
      <div className={`flex gap-4 ${!product && "flex-col-reverse"}`}>
        <div className="w-1/2">
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <label htmlFor="files">Product Images</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories?.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="disabled:bg-gray-400 disabled:cursor-not-allowed btn-black mt-4"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
        <div className="w-1/2">
          <div className="grid grid-cols-3 gap-1">
            {existingImages &&
              existingImages.map((image) => (
                <div key={image}>
                  <div className="h-52 w-52 relative">
                    <Image
                      alt={name}
                      src={`${PRODUCT_IMG_PATH}/${image}`}
                      layout="fill" // required
                      objectFit="cover" // change to suit your needs
                      className="rounded-md" // just an example
                    />
                  </div>
                  <button
                    className="top-0 right-0 p-2 z-50 text-sm text-red-500"
                    onClick={() => deleteImage(image)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
