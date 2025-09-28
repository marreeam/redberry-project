import React from 'react';

interface ColorSelectorProps {
  availableColors: string[];
  selectedColor: string | undefined;
  onSelectColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  availableColors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <p className="text-poppins-normal-16 text-[#10151F]">Colors: <span>{selectedColor}</span></p>
      {availableColors?.length > 0 ? (
      <div className="flex gap-2 mt-1">
        {availableColors?.map((color) => (
          <div
            key={color}
            className={`w-[38px] h-[38px] rounded-full border-2 cursor-pointer flex items-center justify-center ${
              selectedColor?.toLowerCase() === color.toLowerCase()
                ? "border-orange-500"
                : ""
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
            onClick={() => onSelectColor(color)}
          >
       
          </div>
        ))}
      
      </div>
        ):(
          <p className="text-sm text-gray-500">No available colors</p>
        )}
    </div>

  );
};

export default ColorSelector;