"use client";

import { Category, Product } from "@/types";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import { showToast } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

interface ProductProps {
  product?: Product;
}

const productSchema = z.object({
  name: z.string().min(5),
  description: z.string().max(255),
  price: z.string(),
  stock: z.string(),
  categoryId: z.string(),
});

const ProductForm = ({ product }: ProductProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [stock, setStock] = useState(product?.stock.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || []
  );
  const [categories, setCategories] = useState<Category[]>();
  const [categoryId, setCategoryId] = useState<string>(
    product?.category?.id || ""
  );

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

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "" || name,
      description: "" || description,
      price: "" || price,
      stock: "" || stock,
      categoryId: "" || categoryId,
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("stock", values.stock.toString());
    formData.append("categoryId", values.categoryId);
    existingImages.forEach((image) => {
      formData.append("existingImages", image);
    });
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });
    }
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
  }

  // const storeProduct = async (e: React.MouseEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   if (categoryId) formData.append("categoryId", categoryId);
  //   existingImages.forEach((image) => {
  //     formData.append("existingImages", image);
  //   });
  //   if (selectedFiles) {
  //     Array.from(selectedFiles).forEach((file) => {
  //       formData.append("files", file);
  //     });
  //   }
  //   setIsLoading(true);
  //   if (product?.id) {
  //     // update current product
  //     await axios
  //       .put(`/api/products/${product.id}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(() => {
  //         showToast("Product updated", "success");
  //         setSelectedFiles(null);
  //       })
  //       .catch((error: AxiosError) => {
  //         toast.error(error.message, { position: "bottom-right" });
  //       })
  //       .finally(() => setIsLoading(false));
  //   } else {
  //     // save new product
  //     await axios
  //       .post("/api/products", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(() => {
  //         showToast("Product added", "success");
  //         setIsLoading(false);
  //         emptyInputState();
  //       })
  //       .catch((error: AxiosError) => {
  //         showToast(error.message, "error");
  //       })
  //       .finally(() => setIsLoading(false));
  //   }
  // };

  const emptyInputState = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="w-full mt-5 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Of Product</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormLabel htmlFor="category">Category</FormLabel>
        <Select
          name="categoryId"
          value={categoryId}
          onValueChange={(e) => setCategoryId(e)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Uncategorized" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category, index) => (
              <SelectItem key={index} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                name="categoryId"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Uncategorized" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category, index) => (
                    <SelectItem key={index} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel htmlFor="files">Product Images</FormLabel>
        <Input type="file" name="files" multiple onChange={handleFileChange} />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-4 self-end w-[250px]"
        >
          Save
        </Button>
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
      </form>
    </Form>
  );
};

export default ProductForm;
