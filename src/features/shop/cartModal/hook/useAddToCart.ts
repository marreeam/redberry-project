"use client";
import { useMutationApi } from "@/hook/useMutationApi";
import { useQueryClient } from "@tanstack/react-query";

interface AddToCartPayload {
  quantity: number;
  color: string;
  size: string;
}

export const useAddToCart = (productId: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutationApi({
    url: `/cart/products/${productId}`,
    method: "post",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart/products"] });
      
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
    },
  });

  return {
    addToCart: (payload: AddToCartPayload) => mutation.mutate(payload),
    loading: mutation.isPending,
    error: mutation.error,
  };
};
