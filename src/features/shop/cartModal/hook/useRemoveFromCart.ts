"use client";
import { useMutationApi } from "@/hook/useMutationApi";

export const useRemoveFromCart = (productId: number | string) => {
  const { mutate, isLoading, error } = useMutationApi({
    url: `/cart/products/${productId}`,
    method: "delete",
  });

  const removeFromCart = () => mutate();

  return { removeFromCart, loading: isLoading, error };
};
