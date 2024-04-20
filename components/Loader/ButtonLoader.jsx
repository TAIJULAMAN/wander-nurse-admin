import React from "react";

function ButtonLoader({ isLoading = false, className = "", ...restProps }) {
  return isLoading ? (
    <div
      className={`animate-spin rounded-full h-4 w-4 mr-2 border-2 border-white border-r-2 border-r-transparent ${className}`}
      {...restProps}
    ></div>
  ) : (
    <></>
  );
}

export default ButtonLoader;
