import { useState } from "react";
import DatePicker from "./DatePicker";

const DatePickerToday = (props) => {
  const {
    selectsRange,
    isClearable,
    dateFormat,
    isInvalid,
    autoComplete,
    showMonthDropdown,
    showYearDropdown,
    autoFocus,
    placeholderText,
    selected,
    startDate,
    endDate,
    onChange,
    onTodayClick,
    ...restProps
  } = props;

  const [datePickerState, setDatePickerState] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerState(!datePickerState);
  };

  return (
    <DatePicker
      open={datePickerState}
      preventOpenOnFocus
      isClearable={isClearable}
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
      onChange={onChange}
      onClickOutside={toggleDatePicker}
      onInputClick={toggleDatePicker}
      shouldCloseOnSelect
      {...restProps}
    >
      <div className="h-[325px]">
        <span
          className="my-2 absolute bottom-0 left-0 mx-4 p-2 cursor-pointer text-white text-xs rounded-md bg-secondaryButton dark:bg-secondary"
          onClick={() => {
            onChange(new Date());
            toggleDatePicker();
          }}
        >
          Today
        </span>
        <span
          className="my-2 z-50 absolute bottom-0 right-0 mx-4 p-2 cursor-pointer text-white text-xs rounded-md bg-red-500"
          onClick={toggleDatePicker}
        >
          Close
        </span>
      </div>
    </DatePicker>
  );
};

export default DatePickerToday;
