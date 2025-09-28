"use client";

import React, { useState } from "react";
import { useCart } from "../cartModal/hook/useCart";
import CartItem from "../cartModal/component/CartModalContent";
import PrimaryButton from "@/component/ui/button";
import Loading from "@/component/ui/loading";
import { useCheckout } from "../cartModal/hook/useCheckout";

const CheckoutPage: React.FC = () => {
  const { data: cartItems, isLoading, isError, error, refetch } = useCart();
  const { checkout, loading: checkoutLoading, error: checkoutError } = useCheckout();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    email?: string;
    address?: string;
    zipcode?: string;
  }>({});

  const [success, setSuccess] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{(error as any)?.message || "Failed to load cart"}</p>;

  const subtotal = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const delivery = 5;
  const total = subtotal + delivery;

  const handlePay = async () => {
    const newErrors: typeof errors = {};

    if (!name) newErrors.name = "Name is required";
    if (!surname) newErrors.surname = "Surname is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!address) newErrors.address = "Address is required";
    if (!zipcode) newErrors.zipcode = "Zip code is required";
    else if (!/^\d+$/.test(zipcode)) newErrors.zipcode = "Zip code must be a number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await checkout({ name, surname, email, address, zip_code: zipcode });
      setSuccess(true);
      refetch(); 
    } catch (err: any) {
      setErrors({ email: err?.message || "Checkout failed" });
    }
  };

  return (
    <div className="p-10 flex gap-10">
      <div className="flex-1 border p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

        <input
          type="text"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="border p-2 rounded"
        />
        {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}

        <PrimaryButton
          text={checkoutLoading ? "Processing..." : "Pay"}
          onClick={handlePay}
          disabled={checkoutLoading}
        />
      </div>

      <div className="w-[440px] border p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems && cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} refetchCart={refetch} />
            ))}
          </ul>
        ) : (
          <p>No items in cart</p>
        )}

        <div className="mt-auto">
          <div className="flex justify-between">
            <span>Items subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Congrats!</h2>
            <p>Your payment was successful.</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded"
                onClick={() => setSuccess(false)}
              >
                Close
              </button>
              <button
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => {
                  setSuccess(false);
                  window.location.href = "/";
                }}
              >
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
