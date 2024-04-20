"use client";
import React, { useMemo } from "react";
import Form from "./Form";
import { Controller } from "react-hook-form";
import Label from "../Inputs/Label";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { EnumHelper } from "@/utilities/enumHelper";
import Select from "../Inputs/Select";
import CheckBox from "../Inputs/CheckBox";
import ApiKit from "@/common/helpers/ApiKit";
import { get } from "lodash";
import { toastSuccess } from "../Shared/ToastHelpers";

function EducationForm({ getMe }) {
  const alias = get(getMe, "user_id", "");
  const onSuccessfulSubmit = (res) => {
    toastSuccess({ message: "Profile Updated Successfully" });
  };
  const modifyExistingPayload = (payload) => {
    const newPayload = {
      user_id: alias,
      levelOfEducation: payload.levelOfEducation,
      degreeSummery: payload.degreeSummery,
      degreeTitle: payload.degreeTitle,
      educationGroup: payload.educationGroup,
      instituteName: payload.instituteName,
      foreignInstitute: payload.foreignInstitute,
      result: payload.result.value,
      marks: payload.marks,
      passingYear: payload.passingYear.value,
      duration: payload.duration,
      achievement: payload.achievement,
    };
    return newPayload;
  };
  const resultCategoryStatus = useMemo(() => {
    return EnumHelper({ type: "resultCategory", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const passingStatus = useMemo(() => {
    return EnumHelper({ type: "passingYear", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form
      addAPI={ApiKit.profile.postEducation}
      formType="add"
      isLoading={false}
      onSubmitSuccess={onSuccessfulSubmit}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <div className="grid grid-cols-1">
                <Controller
                  name="levelOfEducation"
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
                        <Label htmlFor="levelOfEducation">
                          Level Of Education*
                        </Label>
                        <TextInput
                          type="text"
                          value={value}
                          placeholder="Enter Education Level"
                          error={errors.levelOfEducation}
                          required={true}
                          onChange={onChange}
                        />
                        {errors.levelOfEducation && (
                          <ErrorMessage
                            message={errors.levelOfEducation.message}
                          />
                        )}
                      </div>
                    );
                  }}
                />
                <Controller
                  name="degreeSummery"
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
                      <div className="my-1 flex flex-col">
                        <CheckBox
                          label="Show this degree in summary view at employer's end"
                          checked={value}
                          onChange={() => onChange(!value)}
                        />
                        {errors.degreeSummery && (
                          <ErrorMessage
                            message={errors.degreeSummery.message}
                          />
                        )}
                      </div>
                    );
                  }}
                />
              </div>
              <Controller
                name="degreeTitle"
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
                      <Label htmlFor="degreeTitle">Exam/Degree Title</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Degree Title"
                        error={errors.degreeTitle}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.degreeTitle && (
                        <ErrorMessage message={errors.degreeTitle.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="educationGroup"
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
                      <Label htmlFor="educationGroup">
                        Concentration/Major/Group*
                      </Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Major"
                        error={errors.educationGroup}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.educationGroup && (
                        <ErrorMessage message={errors.educationGroup.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1">
              <Controller
                name="instituteName"
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
                      <Label htmlFor="instituteName">Institute Name*</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Institute Name"
                        error={errors.instituteName}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.instituteName && (
                        <ErrorMessage message={errors.instituteName.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="foreignInstitute"
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
                    <div className="my-1 flex flex-col">
                      <CheckBox
                        label="This is a foreign institute"
                        checked={value}
                        onChange={() => onChange(!value)}
                      />
                      {errors.foreignInstitute && (
                        <ErrorMessage
                          message={errors.foreignInstitute.message}
                        />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="result"
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
                      <Label htmlFor="result">Result*</Label>
                      <Select
                        options={resultCategoryStatus}
                        value={value}
                        placeholder={"Select Result Status"}
                        onChange={onChange}
                      />
                      {errors.result && (
                        <ErrorMessage message={errors.result.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="marks"
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
                      <Label htmlFor="marks">marks(%)*</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter Marks"
                        error={errors.marks}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.marks && (
                        <ErrorMessage message={errors.marks.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="passingYear"
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
                      <Label htmlFor="result">Year of Passing*</Label>
                      <Select
                        options={passingStatus}
                        value={value}
                        placeholder={"Select Year of Passing"}
                        onChange={onChange}
                      />
                      {errors.result && (
                        <ErrorMessage message={errors.result.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="duration"
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
                      <Label htmlFor="duration">Duration(Years)</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Duration"
                        error={errors.duration}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.duration && (
                        <ErrorMessage message={errors.duration.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="achievement"
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
                      <Label htmlFor="achievement">Achievement</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your Achievement"
                        error={errors.achievement}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.achievement && (
                        <ErrorMessage message={errors.achievement.message} />
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

export default EducationForm;
