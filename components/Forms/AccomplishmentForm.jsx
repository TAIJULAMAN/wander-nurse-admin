"use client";

import ApiKit from "@/common/helpers/ApiKit";
import { DATE_FORMAT, LIST_DATA_DATE_FORMAT } from "@/constants/Constant";

import { get } from "lodash";
import React from "react";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

import DatePickerToday from "../DatePicker/DatePickerToday";
import Label from "../Inputs/Label";
import TextArea from "../Inputs/TextArea";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastSuccess } from "../Shared/ToastHelpers";
import Form from "./Form";

function AccomplishmentForm({ getMe }) {
  const alias = get(getMe, "user_id", "");
  const onSuccessfulSubmit = (res) => {
    toastSuccess({ message: "Profile Updated Successfully" });
  };
  const modifyExistingPayload = (payload) => {
    const newPayload = {
      user_id: alias,
      title: payload.title,
      issueDate: format(new Date(payload.issueDate), DATE_FORMAT),
      url: payload.url,
      description: payload.description,
    };
    return newPayload;
  };
  return (
    <>
      <h1 className="">
        <span className="text-hoverText">Award</span>
        <span>(Max 5)</span>
      </h1>
      <Form
        addAPI={ApiKit.profile.postAccomplishment}
        formType="add"
        isLoading={false}
        extraState={""}
        defaultValues={""}
        onSubmitSuccess={onSuccessfulSubmit}
        modifyExistingPayload={modifyExistingPayload}
      >
        {({ control, errors, watch, setValue, reset }) => {
          return (
            <div className="flex flex-col">
              <Controller
                name="title"
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
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="title">Title*</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter Title"
                        error={errors.title}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.title && (
                        <ErrorMessage message={errors.title.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="issueDate"
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
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="issueDate">Issue Date*</Label>
                      <DatePickerToday
                        preventOpenOnFocus
                        showMonthDropdown
                        showYearDropdown
                        isClearable={false}
                        fixedHeight
                        showWeekNumbers
                        shouldCloseOnSelect
                        selected={value}
                        dateFormat={LIST_DATA_DATE_FORMAT}
                        placeholderText={"Select Date"}
                        onChange={onChange}
                      />
                      {errors.issueDate && (
                        <ErrorMessage message={errors.issueDate.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="url"
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
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="url">URL</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter URL"
                        error={errors.url}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.url && (
                        <ErrorMessage message={errors.url.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  maxLength: {
                    value: 500,
                    message: "Max length is 500 characters",
                  },
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="description">Description</Label>
                      <TextArea
                        type="text"
                        value={value}
                        placeholder="Enter your Description"
                        error={errors.description}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.description && (
                        <ErrorMessage message={errors.description.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
          );
        }}
      </Form>
    </>
  );
}

export default AccomplishmentForm;
