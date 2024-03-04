"use client";

import { Product, Category } from "@/types";
import ProductCard from "../guest/ProductCard";
import ProductSkeletonCard from "../guest/skeletons/ProductSkeletonCard";
import Banner from "../guest/Banner";
import CategoryCard from "../guest/CategoryCard";

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
      <div className="my-4">
        <h4 className="text-2xl font-semibold">Categories</h4>
        <div className="grid grid-cols-10 mt-5 gap-2">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
      <h4 className="text-2xl font-semibold">Our Products</h4>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
