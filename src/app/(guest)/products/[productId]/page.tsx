"use client";

import QuantityButton from "@/components/client/QuantityButton";
import ProductDetailSkeleton from "@/components/client/skeletons/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addToCart } from "@/redux/slices/cartSlice";
import { Product } from "@/types";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((response: AxiosResponse) => {
        setProduct(response.data);
      })
      .catch((err) => alert(err));
  }, [productId]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }
  return (
    <div className="flex gap-10 mt-10">
      {product && (
        <Carousel className="max-w-lg mx-10">
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem
                key={image}
                className="w-full flex items-center justify-center"
              >
                <div className="h-96 w-96 relative">
                  <Image
                    alt={image}
                    src={`${PRODUCT_IMG_PATH}/${image}`}
                    layout="fill" // required
                    objectFit="fit" // change to suit your needs
                    className="rounded-md" // just an example
                    quality={100}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {product.images.length > 1 && (
            <div>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Share this product</p>
            <div className="flex gap-2 items-center">
              <FaFacebook size={24} />
              <FaTwitter size={24} />
              <FaInstagram size={24} />
              <FaWhatsapp size={24} />
            </div>
          </div>
        </Carousel>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-3xl">{product?.name}</h3>
        <hr />
        <p className="text-2xl text-green-700 font-semibold">
          Rp. {product?.price}
        </p>
        <p>{product?.description}</p>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Quantity: </p>
          <QuantityButton
            quantity={quantity}
            onDecrease={() => setQuantity((prev) => prev - 1)}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            productId={product.id}
            stock={product.stock}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              dispatch(
                addToCart({
                  ...product,
                  quantity: quantity,
                  subTotal: Number(product.price) * quantity,
                })
              );
            }}
          >
            <BiCart size={16} className="mr-2" />
            Add To Cart
          </Button>
          <Button variant="default" size="sm">
            Buy This Product
          </Button>
        </div>
      </div>
    </div>
  );
}
