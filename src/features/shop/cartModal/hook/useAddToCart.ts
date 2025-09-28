import { useMutationApi } from "@/hook/useMutationApi";
import { useQueryClient } from "@tanstack/react-query";

export const useAddToCart = (productId: number | string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutationApi<void, { quantity: number; color: string; size: string }>({
    url: `/cart/products/${productId}`,
    method: "post",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      if (onSuccess) onSuccess(); 
    },
  });

  return {
    addToCart: (payload: { quantity: number; color: string; size: string }) =>
      mutation.mutate(payload),
    loading: mutation.isPending,
    error: mutation.error,
  };
};

