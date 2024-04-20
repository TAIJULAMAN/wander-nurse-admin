import { cn } from "@/utilities/cn";
import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const DefaultButton = React.forwardRef(
  (
    {
      type = "button",
      onClick = () => {},
      className = "",
      isLoading = false,
      block = false,
      disabled = false,
      variant = "fill",
      children,
      ...restProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "p-3 rounded-lg text-sm leading-tight font-medium align-middle disabled:opacity-50",
          variant === "fill"
            ? "text-primary bg-teal border-0"
            : "bg-transparent border",
          block ? "w-full" : "w-32",
          disabled
            ? "cursor-not-allowed "
            : "cursor-pointer hover:brightness-95",
          className
        )}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...restProps}
      >
        <div className="flex justify-center items-center">
          <ButtonLoader isLoading={isLoading} />
          {children}
        </div>
      </button>
    );
  }
);

DefaultButton.displayName = "DefaultButton";

export default DefaultButton;
