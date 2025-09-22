import React from 'react';

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#FF4000] text-white p-2 w-full rounded-[10px] hover:bg-[#e63a00] transition"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
