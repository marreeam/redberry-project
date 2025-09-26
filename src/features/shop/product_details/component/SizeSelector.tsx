import React from 'react';

interface SizeSelectorProps {
  availableSizes: string[];
  selectedSize: string | undefined;
  onSelectSize: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  availableSizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div>
      <p className="font-medium text-[14px]">Available Sizes:</p>
      <div className="flex gap-2 mt-1">
        {availableSizes.map((size) => (
          <span
            key={size}
            className={`px-3 py-2 border rounded-md text-[14px] cursor-pointer transition-colors duration-200 ${
              selectedSize === size
                ? "border-orange-500 text-orange-500 bg-orange-50"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;