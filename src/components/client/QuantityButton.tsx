"use client";

import { addQuantity, reduceQuantity } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

interface IQuantityBtn {
  onDecrease?: () => void;
  onIncrease?: () => void;
  quantity: number;
  disableDecreaseBtn?: boolean;
  disableIncreaseBtn?: boolean;
  setInitialQuantity?: () => void;
  fromCart?: boolean;
  productId?: string;
  stock?: number;
}

const QuantityButton = ({
  onDecrease,
  onIncrease,
  quantity,
  fromCart,
  productId,
  stock,
}: IQuantityBtn) => {
  const dispatch = useDispatch();

  const handleAddQuantity = () => {
    if (fromCart && productId) {
      dispatch(
        addQuantity({
          id: productId,
          quantity: quantity,
        })
      );
    } else {
      onIncrease && onIncrease();
    }
  };

  const handleReduceQuantity = () => {
    if (fromCart && productId) {
      dispatch(
        reduceQuantity({
          id: productId,
          quantity: quantity,
        })
      );
    } else {
      onDecrease && onDecrease();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Button
        variant="outline"
        size="sm"
        onClick={handleReduceQuantity}
        disabled={quantity === 1}
      >
        -
      </Button>
      <Button variant="outline" size="sm" disabled>
        {quantity}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddQuantity}
        disabled={quantity === stock}
      >
        +
      </Button>
    </div>
  );
};

export default QuantityButton;
