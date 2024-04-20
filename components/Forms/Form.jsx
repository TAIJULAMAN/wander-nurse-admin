import { cloneDeep, isEmpty, isEqual } from "lodash";
import { useForm } from "react-hook-form";

import ClearButton from "../Button/ClearButton";
import SubmitButton from "../Button/SubmitButton";
import { toastError } from "../Shared/ToastHelpers";
import { useState } from "react";

function comparePayload(payload, defaultValues) {
  const preparedPayload = cloneDeep(payload);

  Object.keys(preparedPayload).forEach((key) => {
    if (
      preparedPayload[key] == defaultValues[key] ||
      isEqual(preparedPayload[key], defaultValues[key])
    ) {
      delete preparedPayload[key];
    }
  });

  return preparedPayload;
}

function Form({
  children,
  alias = "",
  className = "",
  formType = "add",
  apiIsLoading = false,
  isFormData = false,
  addAPI = () => {},
  editAPI = () => {},
  extraState = {},
  defaultValues = {},
  setIsLoading = () => {},
  onClear = () => {},
  onlySubmit = false,
  onSubmitSuccess = () => {},
  modifyExistingPayload = () => {},
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setLoading(true);
    const payload = { ...data, ...extraState };
    let modifiedPayload = payload;

    if (typeof modifyExistingPayload === "function") {
      modifiedPayload = modifyExistingPayload(payload);
    }

    if (editAPI) {
      const preparedPayload = comparePayload(modifiedPayload, defaultValues);
      if (Object.keys(preparedPayload).length) {
        modifiedPayload = preparedPayload;
      }
    }

    const onSuccess = (res) => {
      onSubmitSuccess(res);
      reset();
    };

    const onError = (err) => {
      if (err) toastError({ message: err });
    };

    const onFinally = () => {
      setIsLoading(false);
      setLoading(false);
    };

    console.log(modifiedPayload);

    if (
      formType === "add" &&
      addAPI &&
      typeof addAPI === "function" &&
      (!isEmpty(modifiedPayload) || isFormData)
    ) {
      addAPI(modifiedPayload).then(onSuccess).then(onError).finally(onFinally);
    } else if (
      formType === "edit" &&
      editAPI &&
      typeof editAPI === "function" &&
      (!isEmpty(modifiedPayload) || isFormData)
    ) {
      editAPI(alias, modifiedPayload)
        .then(onSuccess)
        .then(onError)
        .finally(onFinally);
    } else {
      setIsLoading(false);
      setLoading(false);
      toastError({ message: "Error! Something went wrong" });
    }
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ control, errors, watch, setValue, reset })}
      <div
        className={`flex items-center justify-end my-3 px-2 gap-3 ${
          className ? className : ""
        }`}
      >
        {onlySubmit ? null : (
          <ClearButton className="w-full" onClick={() => handleClear()}>
            Reset
          </ClearButton>
        )}
        <SubmitButton isLoading={loading} type="submit" className="w-full" />
      </div>
    </form>
  );
}

export default Form;
