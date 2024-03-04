import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-[400px] w-full" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[3px] w-full" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[30px] w-[300px]" />
        <div className="flex gap-2 max-w-[300px]">
          <Skeleton className="h-[30px] w-[300px]" />
          <Skeleton className="h-[30px] w-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
