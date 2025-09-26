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
    <div>
      <p className="font-medium text-[14px]">Available Colors:</p>
      <div className="flex gap-2 mt-1">
        {availableColors.map((color) => (
          <div
            key={color}
            className={`w-[38px] h-[38px] rounded-full border-2 cursor-pointer flex items-center justify-center ${
              selectedColor?.toLowerCase() === color.toLowerCase()
                ? "border-orange-500"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
            onClick={() => onSelectColor(color)}
          >
            {selectedColor?.toLowerCase() === color.toLowerCase() && (
              <span className="text-white text-lg drop-shadow-sm">✔</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;