import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  type: string;
  register: UseFormRegisterReturn; // from react-hook-form
  errorMessage?: string;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  type,
  register,
  errorMessage,
  placeholder,
  className,
}) => {
  return (
    <div className="mb-4">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full border p-2 rounded ${className ?? ""}`}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
