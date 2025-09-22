"use client"
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  placeholderText?:string;
}

const Input: React.FC<InputProps> = ({ errorText, placeholderText, required, className, ...props }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">

        {!value && placeholderText && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {placeholderText}
            {required && <span className="text-red-500"> *</span>}
          </span>
        )}

        <input
          {...props}
          required={required}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          className={`pr-3 pl-3 rounded-lg border border-[#E1DFE1] w-[554px] h-[42px]${
            errorText ? "border-red-500" : "border-gray-300"
          } ${className || ""}`}
        />
      </div>

      {errorText && <p className="text-sm text-red-500">{errorText}</p>}
    </div>
  );
};

export default Input;
