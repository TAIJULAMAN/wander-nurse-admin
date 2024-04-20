import React from "react";

function ClearButton({
  disabled = false,
  children,
  onClick = () => {},
  className = "",
}) {
  return (
    <div className={`w-full`}>
      <button
        onClick={onClick}
        className={`bg-orange-800 text-white font-semibold text-md py-2 px-4 rounded-lg hover:bg-orange-900 focus:outline-none focus:ring-[1px] focus:ring-offset-2 focus:ring-accent
        ${
          disabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : ""
        } ${className} w-full
        `}
      >
        {children}
      </button>
    </div>
  );
}

export default ClearButton;
