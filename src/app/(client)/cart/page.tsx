"use client";

import QuantityButton from "@/components/client/QuantityButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/types";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const { loading, cartItems, totalPrice, subTotal, quantity } = useSelector(
    (state: RootState) => state.cart
  );
  const router = useRouter();

  return (
    <div>
      <h3 className="text-3xl mb-5 font-semibold text-gray-600 text-center">
        Shopping Cart
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <div>
          <p>Cart is empty</p>
        </div>
      ) : (
        <div>
          <ScrollArea className="h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold"></TableHead>
                  <TableHead className="font-bold">Product</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold max-w-[100px]">
                    Quantity
                  </TableHead>
                  <TableHead className="font-bold">SubTotal</TableHead>
                  <TableHead className="font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item, i) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-[100px]">
                        <div className="h-[100px] w-[100px] relative">
                          <Image
                            alt={item.name}
                            src={`${PRODUCT_IMG_PATH}/${item.images[0]}`}
                            layout="fill" // required
                            objectFit="cover" // change to suit your needs
                            className="rounded-md" // just an example
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1">
                            <Link href={`/products/${item.id}`}>
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Rp. {item.price}</TableCell>
                      <TableCell>
                        <QuantityButton
                          quantity={quantity[i].count}
                          fromCart
                          productId={item.id}
                          stock={item.stock}
                        />
                      </TableCell>
                      <TableCell>Rp. {subTotal[i].count}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger>
                            <p className="text-red-500 font-semibold">Delete</p>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                              >
                                Remove
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="flex items-end justify-end mt-5 flex-col gap-3">
            <p className="font-bold">Total : Rp. {totalPrice}</p>
            <div className="flex gap-1">
              <Button variant="outline" onClick={() => router.push("/")}>
                Continue shopping
              </Button>
              <Button variant="default">
                Checkout <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
