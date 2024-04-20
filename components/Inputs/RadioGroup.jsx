import { Fragment } from "react";

const RadioGroup = (props) => {
  const {
    size = "",
    value = "",
    groupname = "",
    disabled = false,
    items = [],
    onChange = () => {},
  } = props;

  const handleOnChange = (e) => {
    onChange(e);
  };

  return (
    <Fragment>
      {items.map((item, index) => (
        <div key={index} className={`flex items-center justify-normal mr-4`}>
          <input
            type="radio"
            disabled={disabled}
            checked={item.value === value}
            className={`${size === "sm" ? "w-3 h-3 p-1" : "w-5 h-5 p-2"} ${
              disabled
                ? "cursor-not-allowed text-gray-600 arrow-hide"
                : "cursor-pointer "
            } mx-2 text-teal border border-accent hover:border-teal focus:ring-0 focus:ring-transparent rounded-full`}
            onChange={(e) => {
              handleOnChange(e);
            }}
            value={item.value}
            id={item.id}
            name={groupname}
          />
          {item.label ? (
            <label
              htmlFor={item.label + item.id}
              className={`ml-2 pt-[2px] ${
                disabled
                  ? "cursor-not-allowed !text-gray-500 arrow-hide"
                  : "cursor-pointer "
              } ${
                size === "sm" ? "text-xs" : "text-md"
              } font-medium break-all text-accent`}
            >
              {item.label}
            </label>
          ) : (
            <></>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default RadioGroup;
