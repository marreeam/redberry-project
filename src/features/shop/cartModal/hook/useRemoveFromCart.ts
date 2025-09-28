import { useMutationApi } from "@/hook/useMutationApi";

interface RemoveCartPayload {
  color: string;
  size: string;
}

export const useRemoveFromCart = (productId: number | string, onSuccess?: () => void) => {
  const { mutate, isPending, error } = useMutationApi<RemoveCartPayload>({
    url: `/cart/products/${productId}`,
    method: "delete",
    onSuccess,
  });

  const removeFromCart = (payload: RemoveCartPayload) => mutate(payload);

  return { removeFromCart, loading: isPending, error };
};
