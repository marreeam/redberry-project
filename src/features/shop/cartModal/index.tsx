"use client";

import React from "react";
import { useCart } from "./hook/useCart";
import { Product } from "@/types/Product";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { data: cartItems, isLoading, isError, error } = useCart();


  
  return (
    <div className="fixed inset-0 z-50 flex  ">
      <div
        className="fixed inset-0 "
        onClick={onClose}
      />

      <div className="ml-auto h-full w-[440px] bg-white shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && <p>Loading cart...</p>}
          {isError && (
            <p className="text-red-500">
              {(error as any)?.message || "Failed to load cart"}
            </p>
          )}

{!isLoading && !isError && (!cartItems || cartItems.length === 0) && (
  <p>Your cart is empty.</p>
)}

{!isLoading && !isError && cartItems && cartItems.length > 0 && (
  <ul className="space-y-4">
    {cartItems.map((item) => (
      <li
        key={`${item.id}-${item.color}-${item.size}`}
        className="flex justify-between  pb-2"
      >
        <div className="flex gap-[17px]">
            <img src={item.cover_image} alt="cover image" className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-[10px]"/>
            <div className="flex flex-col gap-2">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">
            {item.color && <span>{item.color} </span>}
    
          </p>
          <p>   {item.size && <span> {item.size}</span>}</p>
          </div>
        </div>
        <p>
          ${(item.quantity  && item.price) && item.quantity * item.price}
        </p>
      </li>
    ))}
  </ul>
)}

        </div>
      </div>
    </div>
  );
};

export default CartModal;
