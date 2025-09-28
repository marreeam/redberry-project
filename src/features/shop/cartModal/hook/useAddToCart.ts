import { useMutationApi } from "@/hook/useMutationApi";
import { useQueryClient } from "@tanstack/react-query";

export const useAddToCart = (productId: number | string) => {
  const queryClient = useQueryClient();

  const mutation = useMutationApi<void, { quantity: number; color: string; size: string }>({
    url: `/cart/products/${productId}`,
    method: "post",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
      alert("Added to cart!");
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
      alert("Failed to add to cart");
    },
  });

  return {
    addToCart: (payload: { quantity: number; color: string; size: string }) =>
      mutation.mutate(payload),
    loading: mutation.isPending,
    error: mutation.error,
  };
};
