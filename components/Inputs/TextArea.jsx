import { set } from "lodash";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function TextArea({
  children,
  value = "",
  className = "",
  placeholder = "",
  error = false,
  disabled = false,
  required = false,
  isClearable = false,
  onChange = () => {},
}) {
  const handleOnChange = (e) => {
    onChange(e);
  };

  const clearValue = () => {
    if (typeof onChange === "function") {
      onChange("");
    }
  };

  const ClearableButton = () => {
    return (
      <div
        className="absolute left-auto right-1 top-1 cursor-pointer px-2"
        onClick={() => clearValue()}
      >
        <span className="text-gray-600 text-xl font-semibold">
          <AiOutlineClose />
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full flex items-center">
      <textarea
        className={`min-h-[8rem] resize-none overflow-hidden w-full p-2 mx-2 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-teal-500 
        ${className}
        ${disabled ? "bg-gray-300 text-gray-600" : ""}
        ${error && !disabled ? "border-red-400" : ""}
        `}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => handleOnChange(e)}
      />
      {isClearable && <ClearableButton />}
      {children}
    </div>
  );
}

export default TextArea;
