import React from "react";

const ErrorMessage = ({ message }) => {
  return message && <p className="text-red-500 text-xs mx-2 mt-1">{message}</p>;
};

export default ErrorMessage;
