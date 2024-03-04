import dynamic from "next/dynamic";

const CartPage = dynamic(() => import("@/components/pages/CartPage"), {
  ssr: false,
});

export default async function Page() {
  return <CartPage />;
}
