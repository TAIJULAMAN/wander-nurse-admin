import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

function SubmitButton({
  disabled = false,
  isLoading = false,
  type = "submit",
  children,
  className = "",
  onClick = () => {},
}) {
  return (
    <div className={`w-full`}>
      <button
        onClick={onClick}
        type={type}
        className={`bg-default w-full text-white font-semibold text-md py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-[1px] focus:ring-offset-2 focus:ring-accent
        ${
          disabled || isLoading
            ? "bg-darkGray text-gray-600 cursor-not-allowed"
            : ""
        } ${className}
        `}
      >
        <div
          className={`flex items-center ${
            isLoading ? "justify-evenly" : "justify-center"
          }`}
        >
          <ButtonLoader isLoading={isLoading} />
          {type === "submit" ? "Submit" : children}
        </div>
      </button>
    </div>
  );
}

export default SubmitButton;
