"use client";

import { Controller } from "react-hook-form";

import ApiKit from "@/common/helpers/ApiKit";

import Label from "../Inputs/Label";
import PasswordInput from "../Inputs/PasswordInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastSuccess } from "../Shared/ToastHelpers";
import Form from "./Form";
import { get } from "lodash";

function PasswordChangeForm({ getMe }) {
  const alias = get(getMe, "user_id", "");
  const onSuccessfulSubmit = (res) => {
    toastSuccess({ message: "Password Changed Successfully" });
  };

  const modifyExistingPayload = (payload) => {
    return {
      password: payload.password,
    };
  };
  return (
    <Form
      formType="edit"
      alias={alias}
      editAPI={ApiKit.auth.putPasswordChange}
      onlySubmit
      onSubmitSuccess={onSuccessfulSubmit}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 50,
                  message: "Max length is 50 characters",
                },
                minLength: {
                  value: 5,
                  message: "Min length is 5 characters",
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>New Password</Label>
                    <PasswordInput
                      value={value}
                      placeholder="Enter Your New Password"
                      error={errors.password}
                      required={true}
                      onChange={onChange}
                    />
                    {errors.password && (
                      <ErrorMessage message={errors.password.message} />
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="confirmNewPassword"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 50,
                  message: "Max length is 50 characters",
                },
                minLength: {
                  value: 5,
                  message: "Min length is 5 characters",
                },
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "Password and Confirm Password are not same";
                  }
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>Confirm New Password</Label>
                    <PasswordInput
                      value={value}
                      placeholder="Confirm Your New Password"
                      error={errors.confirmNewPassword}
                      required={true}
                      onChange={onChange}
                    />
                    {errors.confirmNewPassword && (
                      <ErrorMessage
                        message={errors.confirmNewPassword.message}
                      />
                    )}
                  </div>
                );
              }}
            />
          </div>
        );
      }}
    </Form>
  );
}

export default PasswordChangeForm;
