"use client";

import React, { useEffect } from "react";
import { useCart } from "./hook/useCart";
import Loading from "@/component/ui/loading";
import PrimaryButton from "@/component/ui/button";
import { useRouter } from "next/navigation";
import CartItem from "./component/CartModalContent";

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const { data: cartItems, isLoading, isError, error, refetch } = useCart();
  const router = useRouter();

  const deliveryCost = 5;

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  ) || 0;

  const total = subtotal + deliveryCost;

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div
        className="absolute right-0 top-0 h-full w-[440px] bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-popins-20">Shopping cart ({cartItems?.length || 0})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && <Loading />}
          {isError && <p className="text-red-500">{(error as any)?.message || "Failed to load cart"}</p>}

          {!isLoading && !isError && (!cartItems || cartItems.length === 0) && (
            <div className="flex flex-col gap-4 items-center justify-center py-8">
              <img src="/svg/emptyCart.svg" alt="empty cart icon" width={170} height={135} />
              <p className="font-semibold text-[24px]">Ooops!</p>
              <p>You’ve got nothing in your cart just yet...</p>
              <PrimaryButton text="Start Shopping" onClick={() => {
        onClose(); 
        router.push("/"); 
      }}/>
            </div>
          )}

          {!isLoading && !isError && cartItems && cartItems.length > 0 && (
            <ul className="space-y-4">
              {cartItems.map((item, idx) => (
                <CartItem key={`${item.id}-${item.color}-${item.size}-${idx}`} item={item} refetchCart={refetch} />
              ))}
            </ul>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="border-t p-4 flex flex-col gap-4">
            <div className="flex justify-between text-medium-14">
              <span>Items subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-medium-14">
              <span>Delivery:</span>
              <span>${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-[16px]">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <PrimaryButton
              text="Go to Checkout"
              onClick={() => router.push("/checkout")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
