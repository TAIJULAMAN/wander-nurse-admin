import React from "react";

function CheckBox({
  label = "",
  id = "",
  checked = false,
  disabled = false,
  size = "",
  className = "",
  onChange = () => {},
}) {
  return (
    <div
      className={`flex items-center justify-normal mr-4 ${
        className ? className : ""
      }`}
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        className={`${size === "sm" ? "w-3 h-3 p-1" : "w-5 h-5 p-2"} ${
          disabled
            ? "cursor-not-allowed text-gray-600 arrow-hide"
            : "cursor-pointer "
        } mx-2 text-teal border border-accent hover:border-accent focus:ring-0 focus:ring-transparent rounded-sm`}
        onChange={(e) => onChange(e)}
      />
      {label ? (
        <label
          htmlFor={label + id}
          className={`ml-2 pt-[2px] ${
            disabled
              ? "cursor-not-allowed !text-gray-500 arrow-hide"
              : "cursor-pointer "
          } ${
            size === "sm" ? "text-xs" : "text-md"
          } font-medium break-all text-accent`}
        >
          {label}
        </label>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CheckBox;
