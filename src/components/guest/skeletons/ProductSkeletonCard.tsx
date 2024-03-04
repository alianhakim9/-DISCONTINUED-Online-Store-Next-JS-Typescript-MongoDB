import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeletonCard = () => {
  return (
    <div className="flex flex-col justify-between gap-2">
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-[12px] w-[50px]" />
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[20px] w-full" />
      <Skeleton className="h-[12px] w-[50px]" />
      <Skeleton className="h-[32px] w-[100px] self-center justify-self-center" />
    </div>
  );
};

export default ProductSkeletonCard;
