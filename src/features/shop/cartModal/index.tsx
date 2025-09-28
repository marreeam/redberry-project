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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div
        className="absolute ml-auto w-[440px] bg-white shadow-xl flex flex-col max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
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
          {isError && <p className="text-red-500">{(error as any)?.message || "Failed to load cart"}</p>}

          {!isLoading && !isError && (!cartItems || cartItems.length === 0) && (
            <div className="flex flex-col gap-7 items-center justify-center p-8">
              <img src="/svg/emptyCart.svg" alt="empty cart icon" width={170} height={135} />
              <p className="font-semibold text-[24px] leading-[100%] tracking-[0%]">Ooops!</p>
              <p className="text-medium-14">You’ve got nothing in your cart just yet...</p>
              <div className="w-[214px]">
                <PrimaryButton text="Start Shopping" onClick={() => router.push("/")} />
              </div>
            </div>
          )}

          {!isLoading && !isError && cartItems && cartItems.length > 0 && (
            <ul className="space-y-[36px]">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.color}-${item.size}-${index}`}
                  item={item}
                  refetchCart={refetch}
                />
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
