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
    <div className='flex flex-col gap-4'>
      <p className="text-poppins-normal-16 text-[#10151F]">Size: <span>{selectedSize}</span></p>
      <div className="flex gap-2 mt-1">
        {availableSizes.map((size) => (
          <span
            key={size}
            className={`px-[16px] py-[9px] w-[70px] text-center border rounded-md text-poppins-normal-16 cursor-pointer transition-colors duration-200 ${
              selectedSize === size
                ? "border-[#10151F] text-[#10151F] "
                : "border-[#E1DFE1] hover:bg-gray-100"
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