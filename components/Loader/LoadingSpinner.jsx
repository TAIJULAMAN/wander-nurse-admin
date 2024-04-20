import React from "react";

function LoadingSpinner({
  isLoading = false,
  size = 100,
  className = "",
  ...restProps
}) {
  return isLoading ? (
    <div
      className={`animate-spin rounded-full h-40 w-40 mr-2 border-4 border-default border-r-4 border-r-transparent ${className}`}
      {...restProps}
    ></div>
  ) : (
    <></>
  );
}

export default LoadingSpinner;
