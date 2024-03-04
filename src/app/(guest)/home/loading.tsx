import ProductSkeletonCard from "@/components/guest/skeletons/ProductSkeletonCard";

export default function Loading() {
  let skeletons = [];
  for (let i = 0; i < 10; i++) {
    skeletons.push(<ProductSkeletonCard key={i} />);
  }

  if (skeletons.length > 1) {
    return <div className="grid grid-cols-5 gap-4">{skeletons}</div>;
  }

  return <div>Loading...</div>;
}
