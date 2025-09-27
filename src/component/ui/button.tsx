import React from "react";
import clsx from "clsx";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string; 
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "bg-[#FF4000] text-white p-2 w-full rounded-[10px] hover:bg-[#e63a00] transition disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {text || children}
    </button>
  );
};

export default PrimaryButton;
