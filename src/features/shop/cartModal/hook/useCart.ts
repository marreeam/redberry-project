"use client";
import { useQueryApi } from "@/hook/useQueryApi";

export const useCart = () => {
  return useQueryApi<{ items: any[] }>({
    url: "/cart/products",
  });
};
