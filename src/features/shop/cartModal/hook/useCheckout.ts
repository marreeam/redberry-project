"use client";
import { useMutationApi } from "@/hook/useMutationApi";

interface CheckoutPayload {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
}

export const useCheckout = () => {
  const { mutate, isPending, error } = useMutationApi({
    url: "/cart/checkout",
    method: "post",
  });

  // Wrap mutate in a promise so we can await it
  const checkout = (payload: CheckoutPayload) =>
    new Promise<void>((resolve, reject) => {
      mutate(payload, {
        onSuccess: () => resolve(),
        onError: (err: any) => reject(err),
      });
    });

  return { checkout, loading: isPending, error };
};
