import { set } from "lodash";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function PasswordInput({
  children,
  value = "",
  className = "",
  placeholder = "",
  error = false,
  disabled = false,
  required = false,
  onChange = () => {},
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnChange = (e) => {
    onChange(e);
  };

  const clearValue = () => {
    setIsVisible(!isVisible);
  };

  const VisibilityButton = () => {
    return (
      <div
        className="absolute left-auto right-2 cursor-pointer pr-2"
        onClick={() => clearValue()}
      >
        <span className="text-gray-600 text-xl font-semibold">
          {isVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full flex items-center select-none">
      <input
        className={`w-full select-none p-2 mx-2 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-teal-500 ${className}
        ${disabled ? "bg-gray-300 text-gray-600" : ""}
        ${error && !disabled ? "border-red-400" : ""}
        `}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => handleOnChange(e)}
      />
      {<VisibilityButton />}
      {children}
    </div>
  );
}

export default PasswordInput;
