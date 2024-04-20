"use client";

import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

import ApiKit from "@/common/helpers/ApiKit";

import Label from "../Inputs/Label";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastSuccess } from "../Shared/ToastHelpers";
import Form from "./Form";
import { LINKS } from "@/constants/Links";

function SignInForm() {
  const router = useRouter();
  const modifyExistingPayload = (payload) => {
    return payload;
  };
  const onSuccess = (res) => {
    window?.localStorage?.setItem("token", res.data.result.accessToken);
    toastSuccess({ message: "Successful! Logged In" });
    router.push(LINKS.dashboard.path);
  };
  return (
    <Form
      addAPI={ApiKit.login.postLogin}
      isLoading={false}
      extraState={""}
      defaultValues={""}
      onlySubmit
      onSubmitSuccess={onSuccess}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>User Email</Label>
                    <TextInput
                      type="text"
                      value={value}
                      placeholder="Enter your Email"
                      error={errors.email}
                      required={true}
                      onChange={onChange}
                    />
                    {errors.email && (
                      <ErrorMessage message={errors.email.message} />
                    )}
                  </div>
                );
              }}
            />
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
                    <Label>Password</Label>
                    <PasswordInput
                      value={value}
                      placeholder="Enter your Password"
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
          </div>
        );
      }}
    </Form>
  );
}

export default SignInForm;
