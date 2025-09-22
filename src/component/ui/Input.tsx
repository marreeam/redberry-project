"use client";
import React, { useState } from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  placeholderText?: string;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  errorText,
  placeholderText,
  isPassword,
  required,
  className,
  ...props
}) => {
  const [value, setValue] = useState(props.defaultValue || "");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative w-full">
      <div className="relative w-full">
        {!value && placeholderText && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {placeholderText}
            {required && <span className="text-red-500"> *</span>}
          </span>
        )}

        <input
          {...props}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          required={required}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
          className={`pr-10 pl-3 rounded-lg border ${
            errorText ? "border-red-500" : "border-[#E1DFE1]"
          } w-[554px] h-[42px] ${className || ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <img src="/img/eye.png" alt="Show password" /> : <img src="/img/eye.png"  alt="Show password"  />}
          </button>
        )}
      </div>

      {errorText && <p className="text-sm text-red-500">{errorText}</p>}
    </div>
  );
};

export default Input;
