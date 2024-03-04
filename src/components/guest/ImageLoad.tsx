import Image from "next/image";

interface Props {
  className: string;
  src: string;
  alt: string;
}

const ImageLoad = ({ className, src, alt }: Props) => {
  return (
    <div className={`${className} relative`}>
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        alt={alt}
        className="rounded-md"
        loading="lazy"
      />
    </div>
  );
};

export default ImageLoad;
