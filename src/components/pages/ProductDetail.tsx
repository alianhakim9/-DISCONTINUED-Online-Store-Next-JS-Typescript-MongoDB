"use client";

import QuantityButton from "@/components/guest/QuantityButton";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
import { Product } from "@/types";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import ImageLoad from "../guest/ImageLoad";
import { showSonnerToast } from "@/utils/helper";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

interface IProductDetail {
  product: Product;
}

const ProductDetail = ({ product }: IProductDetail) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <div className="flex gap-10 mt-10">
      <div>
        {product &&
          (product.images.length > 1 ? (
            <div className="flex flex-col gap-2">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    //  @ts-ignore
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="rounded-lg max-w-lg"
                centeredSlides={true}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <ImageLoad
                      src={`${PRODUCT_IMG_PATH}/${image}`}
                      alt={image}
                      className="w-96 h-96 mx-auto"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Thumbnail */}
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={1}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs rounded-lg w-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button>
                      <ImageLoad
                        src={`${PRODUCT_IMG_PATH}/${image}`}
                        alt={image}
                        className="w-20 h-20"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div>
              <ImageLoad
                src={`${PRODUCT_IMG_PATH}/${product.images[0]}`}
                className="h-96 w-96"
                alt={product.name}
              />
            </div>
          ))}
        <div className="flex flex-col gap-1 mt-5">
          <p className="font-semibold">Share this product</p>
          <div className="flex gap-2 items-center">
            <FaFacebook size={24} />
            <FaTwitter size={24} />
            <FaInstagram size={24} />
            <FaWhatsapp size={24} />
          </div>
        </div>
      </div>
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
              showSonnerToast("Product added to cart", product.name);
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
};

export default ProductDetail;
