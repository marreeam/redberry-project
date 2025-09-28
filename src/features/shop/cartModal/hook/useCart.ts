import { useQueryApi } from "@/hook/useQueryApi";
import { Product } from "@/types/Product";

export const useCart = () => {
  return useQueryApi<Product[]>({ url: "/cart" }); 
};
