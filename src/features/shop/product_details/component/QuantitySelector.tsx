import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onSetQuantity: (quantity: number) => void;
  maxQuantity: number; 
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onSetQuantity,
  maxQuantity = 20, 
}) => {
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="quantity-select" className="text-poppins-normal-16">
        Quantity:
      </label>
      <select
        id="quantity-select"
        value={quantity}
        onChange={(e) => onSetQuantity(Number(e.target.value))}
        className="border border-gray-300 rounded-[10px] px-4 py-[9px] w-[70px] focus:outline-none"
      >
        {quantityOptions.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuantitySelector;
