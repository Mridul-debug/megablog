import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-md font-medium 
        ${bgColor} ${textColor} ${className}
        transition-all duration-200 ease-in-out 
        hover:opacity-90 hover:scale-105 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {children}
    </button>
  );
}
