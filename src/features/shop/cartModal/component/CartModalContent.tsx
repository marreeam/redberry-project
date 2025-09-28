"use client";
import React, { useState } from "react";
import { useUpdateCart } from "../hook/useUpdateCart";
import { useRemoveFromCart } from "../hook/useRemoveFromCart";

interface CartItemProps {
  item: any;
  refetchCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, refetchCart }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const { updateCart } = useUpdateCart(item.id, refetchCart);
  const { removeFromCart } = useRemoveFromCart(item.id, refetchCart);

  const handleChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateCart({ quantity: newQuantity });
  };

  const handleRemove = () => {
    removeFromCart();
    refetchCart();
  };

  return (
    <li key={`${item.id}-${item.color}-${item.size}`}>
      <div className="flex gap-[17px] items-center">
        <img
          src={item.cover_image}
          alt="cover image"
          className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-[10px]"
        />
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-center">
            <p className="text-medium-14">{item.name}</p>
            <p className="font-medium text-[18px] leading-[100%] tracking-[0] text-right">
              ${item.price * quantity}
            </p>
          </div>
          <p className="text-[#3E424A] text-medium-12">{item.color && <span>{item.color} </span>}</p>
          <p className="text-medium-12 text-[#3E424A]">{item.size && <span> {item.size}</span>}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-[#E1DFE1] px-2 py-1 rounded-[22px] w-[70px]">
              <button
                className="text-[16px] rounded flex justify-center items-center"
                onClick={() => handleChange(quantity - 1)}
                style={{ color: quantity === 1 ? "#E1DFE1" : "black" }}
              >
                -
              </button>
              <span className="text-[12px] px-4 text-center">{quantity}</span>
              <button
                className="text-[16px] rounded flex justify-center items-center"
                onClick={() => handleChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 text-[12px] underline ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
