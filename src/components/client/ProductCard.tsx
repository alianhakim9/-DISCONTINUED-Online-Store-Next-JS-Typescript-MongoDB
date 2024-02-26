import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BiCart } from "react-icons/bi";
import Image from "next/image";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import Link from "next/link";
import { Product } from "@/types";

interface IProductProps {
  product: Product;
}

const ProductCard = ({ product }: IProductProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="h-52 w-52 relative">
          <Image
            alt={product.name}
            src={
              product.images[0]
                ? `${PRODUCT_IMG_PATH}/${product.images[0]}`
                : "/images/placeholder.jpg"
            }
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="rounded-md" // just an example
          />
        </div>
        <CardTitle className="hover:text-yellow-400 text-1xl">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription>
          <div className="bg-slate-100 px-2 py-1 rounded-lg w-1/2 my-2 self-start">
            <p>{product.category.name}</p>
          </div>
          <p className="line-clamp-3 text-justify">{product.description}</p>
          <p className="font-bold">$ {product.price}</p>
        </CardDescription>
      </CardHeader>
      {/* <CardContent></CardContent> */}
      <CardFooter className="self-center">
        <Button className="rounded-lg hover:shadow-md">
          <BiCart size={20} className="mr-2" /> Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
