import React from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, text, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium mb-1 ${className ?? ""}`}
    >
      {text}
    </label>
  );
};
