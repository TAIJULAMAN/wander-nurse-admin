import { set } from "lodash";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function TextInput({
  children,
  type = "text",
  value = "",
  className = "",
  placeholder = "Please input the data",
  error = false,
  disabled = false,
  required = false,
  isClearable = false,
  canNegativeNumber = true,
  onChange = () => {},
}) {
  const onWheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  const setPositiveNumber = (value) => {
    const numberValue = Number(value);
    const decimalValues = value?.split?.(".")[1];
    return Math.abs(numberValue).toFixed(decimalValues?.length ?? 0);
  };

  const getValue = (value) => {
    if (type === "number" && !canNegativeNumber) {
      const positiveNumber = setPositiveNumber(value);
      return positiveNumber;
    } else {
      return value;
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    set(e, "target.value", getValue(value));
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
        className="absolute left-auto right-1 cursor-pointer px-2"
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
      <input
        className={`w-full p-2 mx-2 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-teal-500 ${className}
        ${disabled ? "bg-gray-300 text-gray-600" : ""}
        ${error && !disabled ? "border-red-400" : ""}
        `}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onWheel={(e) => onWheel(e)}
        onChange={(e) => handleOnChange(e)}
      />
      {isClearable && type !== "number" && <ClearableButton />}
      {children}
    </div>
  );
}

export default TextInput;