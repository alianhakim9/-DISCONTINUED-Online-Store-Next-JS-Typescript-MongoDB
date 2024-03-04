"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/redux/slices/cartSlice";
import { Product } from "@/types";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import Link from "next/link";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import ImageLoad from "./ImageLoad";
import { showSonnerToast } from "@/utils/helper";

interface IProductProps {
  product: Product;
}

const ProductCard = ({ product }: IProductProps) => {
  const dispatch = useDispatch();

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <ImageLoad
          className="h-40 w-40 mx-auto"
          src={
            product.images[0]
              ? `${PRODUCT_IMG_PATH}/${product.images[0]}`
              : "/images/placeholder.jpg"
          }
          alt={product.name}
        />
        <CardTitle className="hover:text-lime-950 text-1xl">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription>
          <div className="bg-slate-100 px-2 py-1 rounded-lg w-1/2 my-2 self-start">
            <p>{product.category.name}</p>
          </div>
          <p className="font-bold">$ {product.price}</p>
          <p className="line-clamp-3 text-justify">{product.description}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="self-center">
        <Button
          className="rounded-lg hover:shadow-md"
          onClick={() => {
            dispatch(
              addToCart({ ...product, quantity: 1, subTotal: product.price })
            );
            showSonnerToast("Product added to cart", product.name);
          }}
        >
          <BiCart size={20} className="mr-2" /> Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
