import React from "react";

interface ButtonInfo {
  onClick?: () => void;
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  onClick,
  text,
  type = "button",
  disabled = false,
  className,
}: ButtonInfo) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`w-full rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        ${
          disabled
            ? "bg-gray-300 text-black cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-500"
        }
        ${className ?? ""}
      `}
    >
      {text}
    </button>
  );
};
