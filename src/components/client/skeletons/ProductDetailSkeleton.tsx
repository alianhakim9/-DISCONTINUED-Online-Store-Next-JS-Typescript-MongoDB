import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex gap-10">
      <Skeleton className="h-[250px] w-96" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[20px] w-[300px]" />
        <Skeleton className="h-[3px] w-[300px]" />
        <Skeleton className="h-[16px] w-[300px]" />
        <Skeleton className="h-[50px] w-[300px]" />
        <Skeleton className="h-[30px] w-[300px]" />
        <div className="flex gap-2 max-w-[300px]">
          <Skeleton className="h-[30px] w-full" />
          <Skeleton className="h-[30px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
