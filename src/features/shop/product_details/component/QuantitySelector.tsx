import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onSetQuantity: (quantity: number) => void;
  maxQuantity: number; 
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onSetQuantity,
  maxQuantity,
}) => {
  if (maxQuantity <= 0) {
    return (
      <p className="text-red-500 font-medium text-sm">
        Out of stock
      </p>
    );
  }

  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="quantity-select"
        className="font-medium text-[14px] text-gray-700"
      >
        Quantity:
      </label>
      <select
        id="quantity-select"
        disabled={maxQuantity <= 0}
        value={quantity}
        onChange={(e) => onSetQuantity(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-2 w-20 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
