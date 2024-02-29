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
import { useDispatch } from "react-redux";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((response: AxiosResponse) => {
        setProduct(response.data);
      })
      .catch((err) => alert(err));
  }, [productId]);

  const increaseQuantity = () => {
    if (Number(product?.stock) > quantity) {
      setQuantity((prev) => prev + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity((prev) => prev - 1);
    }
    return;
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        subTotal: quantity * Number(product.price),
      })
    );
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }
  return (
    <div className="flex gap-10">
      {product && (
        <Carousel className="max-w-xs mx-10">
          <CarouselContent>
            {product.images.map((image) => (
              <CarouselItem key={image}>
                <div className="h-80 w-80 relative">
                  <Image
                    alt={image}
                    src={`${PRODUCT_IMG_PATH}/${image}`}
                    layout="fill" // required
                    objectFit="cover" // change to suit your needs
                    className="rounded-md" // just an example
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
        </Carousel>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-3xl">{product?.name}</h3>
        <hr />
        <p className="text-2xl text-green-700 font-semibold">
          Rp. {product?.price}
        </p>
        <p>{product?.description}</p>
        <QuantityButton
          quantity={quantity}
          disableDecreaseBtn={quantity === 1}
          disableIncreaseBtn={Number(product?.stock) === quantity}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (product) handleAddToCart(product);
            }}
          >
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
