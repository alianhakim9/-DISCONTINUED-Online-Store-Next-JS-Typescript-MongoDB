"use client";

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
import { removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/types";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const { loading, cartItems } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="flex flex-col gap-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <h4 className="text-1xl font-bold">{item.name}</h4>
              <Dialog>
                <DialogTrigger>
                  <Button type="button" variant="destructive">
                    <BiX size={24} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
