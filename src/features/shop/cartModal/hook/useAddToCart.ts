"use client";

import { useMutationApi } from "@/hook/useMutationApi";

interface AddToCartPayload {
  quantity: number;
  color: string;
  size: string;
}

export const useAddToCart = (productId: number | string) => {
  const { mutate, isLoading, error } = useMutationApi({
    url: `/cart/products/${productId}`,
    method: "post",
  });

  const addToCart = async (payload: AddToCartPayload) => {
    return mutate(payload);
  };

  return { addToCart, loading: isLoading, error };
};
