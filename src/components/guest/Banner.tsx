"use client";

import { carousels } from "@/utils/content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ImageLoad from "./ImageLoad";

const Banner = () => {
  return (
    <Carousel>
      <CarouselContent>
        {carousels.map((carousel, index) => (
          <CarouselItem key={index}>
            <ImageLoad
              className="h-[500px] w-full"
              src={carousel}
              alt="banner-img"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Banner;
