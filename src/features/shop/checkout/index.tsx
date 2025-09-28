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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{(error as any)?.message || "Failed to load cart"}</p>;

  const subtotal = cartItems?.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0) || 0;

  const delivery = 5;
  const total = subtotal + delivery;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Name is required";
    if (!surname) errors.surname = "Surname is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!address) errors.address = "Address is required";
    if (!zipcode) {
      errors.zipcode = "Zip code is required";
    } else if (!/^\d+$/.test(zipcode)) {
      errors.zipcode = "Zip code must be a number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePay = async () => {
    if (!validate()) return;

    try {
      await checkout({
        name,
        surname,
        email,
        address,
        zip_code: zipcode,
      });
      setSuccess(true);
      refetch(); // refresh cart after checkout
    } catch (err) {
      setFormErrors({ general: (err as any)?.message || "Checkout failed" });
    }
  };

  return (
    <div className="p-10 flex gap-10">
      <div className="w-[1129px] h-[635px] flex flex-col gap-6 bg-[#F8F6F7] p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Order details</h2>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded w-[277px] bg-white"
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="p-2 rounded w-[277px] bg-white"
            />
            {formErrors.surname && <p className="text-red-500 text-sm mt-1">{formErrors.surname}</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded w-[578px] bg-white"
          />
          {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 rounded w-[277px] bg-white"
            />
            {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Zip code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="p-2 rounded w-[277px] bg-white"
            />
            {formErrors.zipcode && <p className="text-red-500 text-sm mt-1">{formErrors.zipcode}</p>}
          </div>
        </div>

        {formErrors.general && <p className="text-red-500">{formErrors.general}</p>}
      </div>

      <div className="flex flex-col gap-4">
        {cartItems && cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
            {cartItems.map((item) => (
              <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} refetchCart={refetch} />
            ))}
          </ul>
        ) : (
          <p>No items in cart</p>
        )}
       
        <div className="mt-4 flex flex-col gap-[16px]">
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
        <PrimaryButton
          text={checkoutLoading ? "Processing..." : "Pay"}
          onClick={handlePay}
          disabled={checkoutLoading}
        />
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
