"use client";

import { Product, Category } from "@/types";
import ProductCard from "../guest/ProductCard";
import ProductSkeletonCard from "../guest/skeletons/ProductSkeletonCard";
import Banner from "../guest/Banner";
import CategoryCard from "../guest/CategoryCard";
import { Separator } from "../ui/separator";

interface IHomepage {
  products: Product[];
  categories: Category[];
}

const Homepage = ({ products, categories }: IHomepage) => {
  if (!products) {
    let skeletons = [];
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductSkeletonCard key={i} />);
    }
    return <div className="grid grid-cols-5 gap-4">{skeletons}</div>;
  }

  return (
    <div className="flex flex-col">
      <Banner />
      <div className="my-4 flex gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-1xl font-semibold">Categories</h4>
            <div>
              {categories.map((category, index) => (
                <p key={index} className="text-sm ml-2">
                  {category.name}
                </p>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" />
        </div>
        <div>
          <div className="grid grid-cols-5 gap-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
