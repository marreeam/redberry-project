"use client";
import { useMutationApi } from "@/hook/useMutationApi";

interface UpdateCartPayload {
  quantity?: number;
  color?: string;
  size?: string;
}

export const useUpdateCart = (productId: number | string, onSuccess?: () => void) => {
  const { mutate, isPending, error } = useMutationApi<UpdateCartPayload>({
    url: `/cart/products/${productId}`,
    method: "patch",
    onSuccess: () => {
      if (onSuccess) onSuccess(); 
    },
  });

  const updateCart = (payload: UpdateCartPayload) => mutate(payload);

  return { updateCart, loading: isPending, error };
};
