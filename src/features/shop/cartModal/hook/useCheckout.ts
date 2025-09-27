"use client";
import { useMutationApi } from "@/hook/useMutationApi";

interface CheckoutPayload {
  address: string;
  payment_method: string;
}

export const useCheckout = () => {
  const { mutate, isPending, error } = useMutationApi({
    url: "/checkout",
    method: "post",
  });

  const checkout = (payload: CheckoutPayload) => mutate(payload);

  return { checkout, loading: isPending, error };
};
