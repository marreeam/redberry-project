"use client";
import { useMutationApi } from "@/hook/useMutationApi";

export const useRemoveFromCart = (productId: number | string, onSuccess?: () => void) => {
  const { mutate, isPending, error } = useMutationApi({
    url: `/cart/products/${productId}`,
    method: "delete",
  });

  const removeFromCart = () => mutate({}, { onSuccess }); // <-- pass callback
  return { removeFromCart, loading: isPending, error };
};
