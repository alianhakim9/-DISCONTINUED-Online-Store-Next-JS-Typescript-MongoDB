"use client";

import { Category } from "@/types";
import { showToast } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface ICategoryProps {
  category?: Category;
}

const categorySchema = z.object({
  name: z.string().min(5),
});

const CategoryForm = ({ category }: ICategoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(category?.name || "");

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setIsLoading(true);
    const data = {
      name: values.name,
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
  }

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "" || name,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col mt-5 w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="btn-black btn-disabled mt-4 rounded-lg"
          type="submit"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
