"use client";

import ApiKit from "@/common/helpers/ApiKit";
import { get } from "lodash";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import CheckBox from "../Inputs/CheckBox";
import Label from "../Inputs/Label";
import TextArea from "../Inputs/TextArea";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastSuccess } from "../Shared/ToastHelpers";
import Form from "./Form";
import DatePickerToday from "../DatePicker/DatePickerToday";
import { DATE_FORMAT, LIST_DATA_DATE_FORMAT } from "@/constants/Constant";

function EmploymentForm({ getMe }) {
  const alias = get(getMe, "user_id", "");
  const onSuccessfulSubmit = (res) => {
    toastSuccess({ message: "Profile Updated Successfully" });
  };
  const modifyExistingPayload = (payload) => {
    const newPayload = {
      user_id: alias,
      companyName: payload.companyName,
      companyBusiness: payload.companyBusiness,
      designation: payload.designation,
      department: payload.department,
      employmentPeriodFromDate: format(
        new Date(payload.employmentPeriodFromDate),
        DATE_FORMAT
      ),
      employmentPeriodToDate: format(
        new Date(payload.employmentPeriodToDate),
        DATE_FORMAT
      ),
      responsibilities: payload.responsibilities,
      areaOfExpertise: payload.areaOfExpertise,
      companyLocation: payload.companyLocation,
      currentlyWorking: payload.currentlyWorking ? true : false,
    };
    return newPayload;
  };
  return (
    <Form
      addAPI={ApiKit.profile.postEmployment}
      formType="add"
      isLoading={false}
      onSubmitSuccess={onSuccessfulSubmit}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="companyName"
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
                      <Label htmlFor="companyName">Company Name*</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Company Name"
                        error={errors.companyName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.companyName && (
                        <ErrorMessage message={errors.companyName.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="companyBusiness"
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
                      <Label htmlFor="companyBusiness">Company Business</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Company Business"
                        error={errors.companyBusiness}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.companyBusiness && (
                        <ErrorMessage
                          message={errors.companyBusiness.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="designation"
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
                      <Label htmlFor="designation">Designation</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Designation"
                        error={errors.designation}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.designation && (
                        <ErrorMessage message={errors.designation.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="department"
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
                      <Label htmlFor="department">Department</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Department Name"
                        error={errors.department}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.department && (
                        <ErrorMessage message={errors.department.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <div className="grid grid-cols-1">
                <Controller
                  name="employmentPeriodFromDate"
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
                        <Label htmlFor="employmentPeriodFromDate">
                          Employment Start Period*
                        </Label>
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
                        {errors.employmentPeriodFromDate && (
                          <ErrorMessage
                            message={errors.employmentPeriodFromDate.message}
                          />
                        )}
                      </div>
                    );
                  }}
                />
                <Controller
                  name="currentlyWorking"
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
                        <CheckBox
                          label="Currently Working"
                          checked={value}
                          onChange={() => onChange(!value)}
                        />
                        {errors.currentlyWorking && (
                          <ErrorMessage
                            message={errors.currentlyWorking.message}
                          />
                        )}
                      </div>
                    );
                  }}
                />
              </div>
              <Controller
                name="employmentPeriodToDate"
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
                    <div className="my-3">
                      <Label htmlFor="employmentPeriodToDate">
                        Employment End Period*
                      </Label>
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
                      {errors.employmentPeriodToDate && (
                        <ErrorMessage
                          message={errors.employmentPeriodToDate.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <Controller
              name="responsibilities"
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
                    <Label htmlFor="responsibilities">Responsibilities</Label>
                    <TextArea
                      type="text"
                      value={value}
                      placeholder="Enter your Responsibilities"
                      error={errors.responsibilities}
                      required={true}
                      onChange={onChange}
                    />
                    {errors.responsibilities && (
                      <ErrorMessage message={errors.responsibilities.message} />
                    )}
                  </div>
                );
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="areaOfExpertise"
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
                      <Label htmlFor="areaOfExpertise">
                        Area Of Expertise*
                      </Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Expertise"
                        error={errors.areaOfExpertise}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.areaOfExpertise && (
                        <ErrorMessage
                          message={errors.areaOfExpertise.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="companyLocation"
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
                      <Label htmlFor="companyLocation">Company Location</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Company Location"
                        error={errors.companyLocation}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.companyLocation && (
                        <ErrorMessage
                          message={errors.companyLocation.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            {/* TODO:add button here */}
          </div>
        );
      }}
    </Form>
  );
}

export default EmploymentForm;
