"use client";
import { useMutationApi } from "@/hook/useMutationApi";

interface UpdateCartPayload {
  quantity?: number;
  color?: string;
  size?: string;
}

export const useUpdateCart = (productId: number | string) => {
  const { mutate, isPending, error } = useMutationApi({
    url: `/cart/products/${productId}`,
    method: "patch",
  });

  const updateCart = (payload: UpdateCartPayload) => mutate(payload);

  return { updateCart, loading: isPending, error };
};
