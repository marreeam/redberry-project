import { useQueryApi } from "@/hook/useQueryApi";
import { Product } from "@/types/Product";

interface UseProductOptions {
  id: string | number;
}

export const useProduct = ({ id }: UseProductOptions) => {
  return useQueryApi<Product>({
    url: `/products/${id}`,
  });
};
