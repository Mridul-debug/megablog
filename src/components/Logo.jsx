import React from "react";

function Logo({ width = "140px", height = "40px" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 40"  // Increased width from 160 to 180
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Megablog Logo"
      className="cursor-pointer"
    >
      {/* White background circle for contrast */}
      <circle cx="20" cy="20" r="18" fill="white" />

      {/* Pen nib icon in blue */}
      <path
        d="M14 22L20 14L26 22L20 30L14 22Z"
        fill="#3B82F6"
        stroke="#3B82F6"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="22" r="2" fill="#2563EB" />

      {/* Text: "Mega" in light blue */}
      <text
        x="45"       // shifted left from 50 to 45
        y="26"
        fontFamily="'Poppins', sans-serif"
        fontWeight="700"
        fontSize="24"
        fill="#BFDBFE"
      >
        Mega
      </text>

      {/* Text: "Blog" in light gray */}
      <text
        x="110"
        y="26"
        fontFamily="'Poppins', sans-serif"
        fontWeight="600"
        fontSize="24"
        fill="#E5E7EB"
      >
        Blog
      </text>
    </svg>
  );
}

export default Logo;
