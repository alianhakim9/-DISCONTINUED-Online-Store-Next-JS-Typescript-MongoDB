import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ImageLoad from "./ImageLoad";

const Banner = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <ImageLoad
            className="h-[400px] w-full"
            src="https://images.unsplash.com/photos/a-black-t-shirt-with-the-word-roam-north-printed-on-it-9p9WOTEmlZw"
            alt="banner-img"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Banner;
