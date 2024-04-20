"use client";

import React, { useMemo } from "react";
import Form from "./Form";
import { Controller } from "react-hook-form";
import Label from "../Inputs/Label";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { EnumHelper } from "@/utilities/enumHelper";
import Select from "../Inputs/Select";
import TextArea from "../Inputs/TextArea";
import DatePickerToday from "../DatePicker/DatePickerToday";
import { LIST_DATA_DATE_FORMAT } from "@/constants/Constant";
import ApiKit from "@/common/helpers/ApiKit";
import { get } from "lodash";
import { toastSuccess } from "../Shared/ToastHelpers";
import PersonalInfo from "../PersonalInfo/PersonalInfo";

function PersonalForm({ getMe }) {
  const alias = get(getMe, "user_id", "");
  const modifyExistingPayload = (payload) => {
    const newPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      fatherName: payload.fatherName,
      motherName: payload.motherName,
      dateOfBirth: payload.dateOfBirth,
      gender: payload.gender.value,
      region: payload.region.value,
      maritalStatus: payload.maritalStatus.value,
      nationality: payload.nationality,
      nationalId: payload.nationalId,
      passportNumber: payload.passportNumber,
      passportIssueDate: payload.passportIssueDate,
      primaryMobile: payload.primaryMobile,
      secondaryMobile: payload.secondaryMobile,
      emergencyContact: payload.emergencyContact,
      primaryEmail: payload.primaryEmail,
      permanentAddress: payload.permanentAddress,
      presentAddress: payload.presentAddress,
      alternativeEmail: payload.alternativeEmail,
      bloodGroup: payload.bloodGroup.value,
      height: payload.height,
      weight: payload.weight,
    };

    return newPayload;
  };
  const genderStatus = useMemo(() => {
    return EnumHelper({ type: "gender", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regionStatus = useMemo(() => {
    return EnumHelper({ type: "region", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const maritalStatus = useMemo(() => {
    return EnumHelper({ type: "maritalStatus", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const bloodGroupStatus = useMemo(() => {
    return EnumHelper({ type: "bloodGroup", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSuccessfulSubmit = (res) => {
    toastSuccess({ message: "Profile Updated Successfully" });
  };
  return (
    <Form
      editAPI={ApiKit.profile.putProfileUpdate}
      formType="edit"
      alias={alias}
      isLoading={false}
      extraState={""}
      defaultValues={""}
      onSubmitSuccess={onSuccessfulSubmit}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="firstName"
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
                      <Label htmlFor="firstName">First Name*</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your First Name"
                        error={errors.firstName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.firstName && (
                        <ErrorMessage message={errors.firstName.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="lastName"
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
                      <Label htmlFor="lastName">Last Name</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Last Name"
                        error={errors.lastName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.lastName && (
                        <ErrorMessage message={errors.lastName.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="fatherName"
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
                      <Label htmlFor="fatherName">Father Name</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Father Name"
                        error={errors.fatherName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.fatherName && (
                        <ErrorMessage message={errors.fatherName.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="motherName"
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
                      <Label htmlFor="lastName">Mother Name</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Mother Name"
                        error={errors.motherName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.motherName && (
                        <ErrorMessage message={errors.motherName.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="dateOfBirth"
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
                      <Label htmlFor="dateOfBirth">Date of Birth*</Label>
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
                      {errors.dateOfBirth && (
                        <ErrorMessage message={errors.dateOfBirth.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="gender"
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
                      <Label htmlFor="gender">Gender*</Label>
                      <Select
                        options={genderStatus}
                        value={value}
                        placeholder={"Select Gender"}
                        onChange={onChange}
                      />
                      {errors.gender && (
                        <ErrorMessage message={errors.gender.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="region"
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
                      <Label htmlFor="region">Region</Label>
                      <Select
                        options={regionStatus}
                        value={value}
                        placeholder={"Select Region"}
                        onChange={onChange}
                      />
                      {errors.region && (
                        <ErrorMessage message={errors.region.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="maritalStatus"
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
                      <Label htmlFor="maritalStatus">Marital Status*</Label>
                      <Select
                        options={maritalStatus}
                        value={value}
                        placeholder={"Select Marital Status"}
                        onChange={onChange}
                      />
                      {errors.maritalStatus && (
                        <ErrorMessage message={errors.maritalStatus.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="nationality"
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
                      <Label htmlFor="nationality">Nationality*</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Nationality"
                        error={errors.nationality}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.nationality && (
                        <ErrorMessage message={errors.nationality.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="nationalId"
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
                      <Label htmlFor="nationalId">National Id</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your National Id"
                        error={errors.nationalId}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.nationalId && (
                        <ErrorMessage message={errors.nationalId.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="passportNumber"
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
                      <Label htmlFor="passportNumber">Passport Number</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Passport Number"
                        error={errors.passportNumber}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.passportNumber && (
                        <ErrorMessage message={errors.passportNumber.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="passportIssueDate"
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
                      <Label htmlFor="passportIssueDate">
                        Passport Issue Date
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
                      {errors.passportIssueDate && (
                        <ErrorMessage
                          message={errors.passportIssueDate.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="primaryMobile"
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
                      <Label htmlFor="primaryMobile">Primary Mobile</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Number"
                        error={errors.primaryMobile}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.primaryMobile && (
                        <ErrorMessage message={errors.primaryMobile.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="secondaryMobile"
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
                      <Label htmlFor="secondaryMobile">Secondary Mobile</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Number"
                        error={errors.secondaryMobile}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.secondaryMobile && (
                        <ErrorMessage
                          message={errors.secondaryMobile.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="emergencyContact"
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
                      <Label htmlFor="emergencyContact">
                        Emergency Contact
                      </Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Number"
                        error={errors.emergencyContact}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.emergencyContact && (
                        <ErrorMessage
                          message={errors.emergencyContact.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="primaryEmail"
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
                      <Label htmlFor="PrimaryEmail">Primary Email</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Mail"
                        error={errors.primaryEmail}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.primaryEmail && (
                        <ErrorMessage message={errors.primaryEmail.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            {/* pa,pa */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="permanentAddress"
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
                      <Label htmlFor="permanentAddress">
                        Permanent Address
                      </Label>
                      <TextArea
                        type="text"
                        value={value}
                        placeholder="Enter your Address"
                        error={errors.permanentAddress}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.permanentAddress && (
                        <ErrorMessage
                          message={errors.permanentAddress.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="presentAddress"
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
                      <Label htmlFor="presentAddress">Present Address</Label>
                      <TextArea
                        type="text"
                        value={value}
                        placeholder="Enter your Address"
                        error={errors.presentAddress}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.presentAddress && (
                        <ErrorMessage message={errors.presentAddress.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="alternativeEmail"
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
                      <Label htmlFor="alternativeEmail">
                        Alternative Email
                      </Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Mail"
                        error={errors.alternativeEmail}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.alternativeEmail && (
                        <ErrorMessage
                          message={errors.alternativeEmail.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="bloodGroup"
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
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select
                        options={bloodGroupStatus}
                        value={value}
                        placeholder={"Select Blood Group"}
                        onChange={onChange}
                      />
                      {errors.bloodGroup && (
                        <ErrorMessage message={errors.bloodGroup.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="height"
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
                      <Label htmlFor="height">Height</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Height"
                        error={errors.height}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.height && (
                        <ErrorMessage message={errors.height.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="weight"
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
                      <Label htmlFor="weight">Weight(kg)</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Weight"
                        error={errors.weight}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.weight && (
                        <ErrorMessage message={errors.weight.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        );
      }}
    </Form>
  );
}

export default PersonalForm;
