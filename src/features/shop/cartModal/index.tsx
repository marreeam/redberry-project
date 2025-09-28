"use client";

import React, { useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Product } from "@/types/Product";
import Loading from "@/component/ui/loading";
import PrimaryButton from "@/component/ui/button";
import { useRouter } from "next/navigation";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { data: cartItems, isLoading, isError, error } = useCart();
  const router = useRouter();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="ml-auto w-[440px] bg-white shadow-xl flex flex-col max-h-screen">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-popins-20 p-10">
            Shopping cart (<span>{cartItems?.length}</span>)
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-6">
          {isLoading && <Loading />}
          {isError && (
            <p className="text-red-500">
              {(error as any)?.message || "Failed to load cart"}
            </p>
          )}

          {!isLoading && !isError && (!cartItems || cartItems.length === 0) && (
            <div className="flex flex-col gap-7 items-center justify-center p-8">
                <img src="/svg/emptyCart.svg" alt="empty cart icon" width={170} height={135}/>
                <p className="font-semibold text-[24px] leading-[100%] tracking-[0%]">Ooops!</p>
                <p className="text-medium-14">You’ve got nothing in your cart just yet...</p>
                <div className="w-[214px]">
                    <PrimaryButton text="Start Shopping"  onClick={() => router.push("/")}/>
                </div>
            </div>
          )}

          {!isLoading && !isError && cartItems && cartItems.length > 0 && (
            <ul className="space-y-[36px]">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.color}-${item.size}`}>
                  <div className="flex gap-[17px]">
                    <img
                      src={item.cover_image}
                      alt="cover image"
                      className="w-[100px] h-[134px] border border-[#E1DFE1] rounded-[10px]"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <p className="text-medium-14">{item.name}</p>
                        <p className="font-medium text-[18px] leading-[100%] tracking-[0] text-right">
                          $
                          {item.quantity && item.price
                            ? item.quantity * item.price
                            : ""}
                        </p>
                      </div>
                      <p className="text-[#3E424A] text-medium-12">
                        {item.color && <span>{item.color} </span>}
                      </p>
                      <p className="text-medium-12 text-[#3E424A]">
                        {item.size && <span> {item.size}</span>}
                      </p>
                    </div>
                  </div>
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
