import { AsyncPaginate, wrapMenuList } from "react-select-async-paginate";
import ReactSelect, { components } from "react-select";
import get from "lodash/get";
import PropTypes from "prop-types";

import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { ASYNC_SELECT, SELECT } from "@/constants/Constant";
import CheckBox from "./CheckBox";

const Select = React.forwardRef((props, ref) => {
  const {
    type,
    options,
    name,
    value,
    cacheOptions,
    onChange: parentOnChange,
    isMulti,
    closeMenuOnSelect,
    autoFocus,
    getSelectedOptionLabel,
    backspaceRemovesValue,
    isDisabled,
    defaultOptions,
    ...restProps
  } = props;

  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const selectRef = useRef(null);

  const onChange = (data) => {
    if (parentOnChange) return parentOnChange(data);
  };

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  const commonProps = {
    isMulti,
    isDisabled,
    defaultOptions,
    options,
    onChange,
    autoFocus,
    closeMenuOnSelect: closeMenuOnSelect || !isMulti,
    backspaceRemovesValue,
    classNamePrefix: "react-select",
    ...(type === ASYNC_SELECT ? { debounceTimeout: 400 } : {}),
    value,
    inputValue: input,
    onInputChange: (value, state) => {
      if (state.action === "input-change") {
        setInput(value);
      }
      if (state.action === "menu-close") {
        setInput("");
      }
    },
    onKeyDown: (event) => {
      if (event.code === "Escape") {
        selectRef?.current?.blur?.();
        event.stopPropagation?.();
      }
    },
    styles: {
      control: (provided, state) => {
        const isFocused = get(state, "isFocused", false);
        return {
          ...provided,
          cursor: "pointer",
          color: "white",
          ...(isFocused
            ? {
                "&:hover": {
                  //   border: "1px solid transparent",
                },
              }
            : {}),
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          backgroundColor: state.isDisabled
            ? "var(--disable-input-bg)"
            : "var(--white-bg)",
          minHeight: "2.6rem",
          borderRadius: "0.5rem",
          border: "1px solid var(--border)",
          "&:focus-within": {
            border: "1px solid var(--border)",
            boxShadow: "0px 0px 0px 1px var(--border)",
          },
        };
      },
      input: (provided, state) => {
        return {
          ...provided,
          color: state.isDisabled ? "var(--disable-accent)" : "var(--accent)",
          position: "absolute",
          ":not([data-value=''])": {
            position: "relative",
          },
        };
      },
      placeholder: (provided, state) => {
        return {
          ...provided,
          color: state.isDisabled
            ? "var(--disable-input-placeholder)"
            : "var(--input-placeholder)",
          overflow: "hidden",
          textOverflow: "ellipsis",
        };
      },
      singleValue: (provided, state) => {
        return {
          ...provided,
          color: state.isDisabled ? "var(--disable-accent)" : "var(--accent)",
        };
      },
      multiValue: (provided, state) => {
        return {
          ...provided,
          backgroundColor: "transparent",
        };
      },
      multiValueRemove: (provided, state) => {
        return {
          ...provided,
          display: "none",
        };
      },
    },
    ...restProps,
  };

  const CustomOption = useCallback((optionProps) => {
    const { innerProps, innerRef, isSelected, label, options } = optionProps;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex flex-row p-2 cursor-pointer align-center border-b-2 ${
          isSelected
            ? "bg-[#428bca] dark:bg-white-bg dark:border-default"
            : "hover:bg-borderColor border-white-bg"
        }`}
      >
        <div className="">
          <CheckBox defaultChecked={isSelected}></CheckBox>
        </div>
        <span className={`ml-3 text-accent ${isSelected ? "text-white" : ""}`}>
          {label}
        </span>
      </div>
    );
  }, []);

  const CustomMenuList = useCallback((props) => {
    const selectedOptions = props.hasValue ? props.getValue() : [];

    return (
      <components.MenuList {...props}>
        <div>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => {
              const label = selectRef.current?.getOptionLabel?.(option);

              return (
                <div
                  key={`${index}-${label}`}
                  onClick={() => selectRef.current?.selectOption(option)}
                  className={`flex flex-row p-2 cursor-pointer align-center border-b-2 bg-[#428bca] dark:bg-white-bg dark:border-default`}
                >
                  <div className="">
                    <CheckBox defaultChecked></CheckBox>
                  </div>
                  <span className={`ml-3 text-accent text-white`}>{label}</span>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        {props.children}
      </components.MenuList>
    );
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const WrapperMenuList = useCallback(
    type === ASYNC_SELECT ? wrapMenuList(CustomMenuList) : CustomMenuList,
    []
  );

  const MultiValue = (props) => {
    return null;
  };

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const CustomValueContainer = useCallback((props) => {
    const inputValue = props.selectProps?.inputValue || "";
    const selectedOptions = props.hasValue ? props.getValue() : [];
    const selectedOptionsText = props
      .getValue()
      .map((option) =>
        getSelectedOptionLabel
          ? getSelectedOptionLabel(option)
          : selectRef.current?.getOptionLabel?.(option)
      )
      .join(", ");

    return (
      <components.ValueContainer {...props}>
        {inputValue ? null : selectedOptions.length > 0 ? (
          <div
            {...props}
            //isFocused={props.isFocused}
            className="text-accent opacity-100 overflow-hidden text-ellipsis"
          >
            {selectedOptionsText}
          </div>
        ) : null}
        {props.children}
      </components.ValueContainer>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`react-select-container mx-2 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {type === SELECT ? (
        <ReactSelect
          ref={(elementRef) => {
            if (ref) ref.current = elementRef;
            selectRef.current = elementRef;
          }}
          {...commonProps}
          components={
            isMulti
              ? {
                  Option: CustomOption,
                  MenuList: CustomMenuList,
                  MultiValue: MultiValue,
                  ValueContainer: CustomValueContainer,
                  Placeholder: Placeholder,
                }
              : {}
          }
        />
      ) : (
        <AsyncPaginate
          selectRef={(elementRef) => {
            if (ref) ref.current = elementRef;
            selectRef.current = elementRef;
          }}
          {...commonProps}
          components={
            isMulti
              ? {
                  Option: CustomOption,
                  MenuList: WrapperMenuList,
                  MultiValue: MultiValue,
                  Placeholder: Placeholder,
                  ValueContainer: CustomValueContainer,
                }
              : {}
          }
        />
      )}
    </div>
  );
});

Select.displayName = "Select";

Select.defaultProps = {
  type: SELECT,
  isMulti: false,
  name: "",
  options: [],
  autoFocus: false,
  isClearable: true,
  isDisabled: false,
  getSelectedOptionLabel: null,
  backspaceRemovesValue: false,
  defaultOptions: false,
};

Select.propTypes = {
  type: PropTypes.oneOf([SELECT, ASYNC_SELECT]),
  isMulti: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  closeMenuOnSelect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  getSelectedOptionLabel: PropTypes.func,
  backspaceRemovesValue: PropTypes.bool,
  defaultOptions: PropTypes.bool,
};

export default Select;
