import React from "react";
import ReactDatePicker from "react-datepicker";

import { cn } from "@/utilities/cn";

const DatePicker = ({
  selectsRange = false,
  isClearable,
  disabled = false,
  additionalClassName = "",
  dateFormat,
  isInvalid,
  autoComplete = "off",
  showMonthDropdown = true,
  showYearDropdown = true,
  autoFocus = false,
  placeholderText,
  selected,
  startDate,
  endDate,
  onChange,
  children,
  ...restProps
}) => {
  const onChangeDate = (dates) => {
    if (onChange) onChange(dates);
  };

  return (
    <ReactDatePicker
      wrapperClassName="w-full"
      className={cn(
        `w-full rounded-lg border-borderColor focus:border-borderColor focus:ring-borderColor placeholder:text-inputPlaceholder`,
        disabled
          ? "cursor-not-allowed text-disableAccent !bg-disableInputBg placeholder:text-disableInputPlaceholder"
          : "cursor-pointer",
        additionalClassName ? additionalClassName : ""
      )}
      selectsRange={selectsRange}
      preventOpenOnFocus
      isClearable={isClearable}
      disabled={disabled}
      dateFormat={dateFormat}
      isInvalid={isInvalid}
      autoComplete={autoComplete}
      showMonthDropdown={showMonthDropdown}
      showYearDropdown={showYearDropdown}
      autoFocus={autoFocus}
      placeholderText={placeholderText}
      selected={selected}
      startDate={startDate}
      endDate={endDate}
      onChange={onChangeDate}
      render
      {...restProps}
    >
      {children}
    </ReactDatePicker>
  );
};

export default DatePicker;
