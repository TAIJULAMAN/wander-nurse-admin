import React from "react";
import DefaultButton from "../Button/DefaultButton";

const PageErrorFallback = (props) => {
  const { error, resetErrorBoundary } = props;

  const onResetErrorBoundary = () => {
    resetErrorBoundary();
  };

  return (
    <div className="justify-center items-center gap-2 p-4">
      <h1 className="font-semibold text-lg text-center">
        Something went wrong.
      </h1>
      <DefaultButton
        className="w-auto"
        onClick={() => {
          onResetErrorBoundary();
        }}
      >
        Try Again
      </DefaultButton>
    </div>
  );
};

export default PageErrorFallback;
