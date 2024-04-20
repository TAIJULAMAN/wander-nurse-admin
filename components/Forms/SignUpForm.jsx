"use client";

import { get, isEmpty } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";

import ApiKit from "@/common/helpers/ApiKit";
import HttpKit from "@/common/helpers/HttpKit";
import { ASYNC_SELECT, DROPDOWN_OPTIONS_LIMIT } from "@/constants/Constant";
import { EnumHelper } from "@/utilities/enumHelper";

import Label from "../Inputs/Label";
import PasswordInput from "../Inputs/PasswordInput";
import Select from "../Inputs/Select";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastError, toastSuccess } from "../Shared/ToastHelpers";
import Form from "./Form";
import { LINKS } from "@/constants/Links";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router=useRouter()
  const [employmentTypeOptions, setEmploymentTypeOptions] = useState([]);
  const [professionOptions, setProfessionOptions] = useState([]);

  let _nextDataFound = useRef(null);

  const getOptionsData = useCallback(
    ({
      params = {},
      api,
      alias,
      setters,
      additional,
      isMoreApiCall = false,
    }) => {
      const keywordArray = get(params, "keywordArray", []);
      const previous = get(additional, "data.previous", "");
      const next = get(additional, "data.next", "");
      const hasPrevious = Boolean(previous);
      const hasNext = Boolean(next);
      let hasMore = false;
      const maxOptionLength = 20;

      const onSuccess = (response) => {
        const data = get(response, "data", {});
        const _hasNext = get(data, "next", "");
        const options = get(data, "result", []);
        hasMore = Boolean(_hasNext);
        if (isMoreApiCall) {
          _nextDataFound.current = options;
        }

        setters((prevOptions) => [...prevOptions, ...options]);
        return {
          options,
          hasMore,
          additional: {
            data,
          },
        };
      };

      const onError = (error) => {
        if (error) {
          toastError({
            message: "Error! Something went wrong, please try again",
          });
          return {
            options: [],
            hasMore,
          };
        }
      };

      if (!hasNext && !hasPrevious) {
        return alias
          ? api(alias, params).then(onSuccess).catch(onError)
          : api(params).then(onSuccess).catch(onError);
      } else if (hasNext) {
        if (
          !isEmpty(_nextDataFound?.current) &&
          _nextDataFound?.current?.length >= DROPDOWN_OPTIONS_LIMIT
        ) {
          return HttpKit.get(next).then(onSuccess).catch(onError);
        } else {
          // if other API use to call next page data
          if (!isMoreApiCall || (isMoreApiCall && isEmpty(params))) {
            return HttpKit.get(next).then(onSuccess).catch(onError);
          } else {
            return {
              options: [],
              hasMore,
            };
          }
        }
      } else {
        return {
          options: [],
          hasMore,
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const loadEmploymentTypeOptions = (inputValue, prevOptions, additional) => {
    return getOptionsData({
      params: inputValue ? { keyword: inputValue } : {},
      api: ApiKit.search.getEmploymentType,
      setters: setEmploymentTypeOptions,
      additional,
    });
  };

  const loadProfessionOptions = (inputValue, prevOptions, additional) => {
    return getOptionsData({
      params: inputValue ? { keyword: inputValue } : {},
      api: ApiKit.search.getProfession,
      setters: setProfessionOptions,
      additional,
    });
  };

  const getSelectValue = (options, value, isValue) => {
    return isValue
      ? options.filter((item) => item.value === value)
      : options.filter((item) => item.profession_id === value.profession_id);
  };

  const getSelectValueForEmploymentType = (options, value, isValue) => {
    return isValue
      ? options.filter((item) => item.value === value)
      : options.filter(
          (item) => item.employment_type_id === value.employment_type_id
        );
  };

  const professionStatus = useMemo(() => {
    return EnumHelper({ type: "profession", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const experienceStatus = useMemo(() => {
    return EnumHelper({ type: "experience", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employmentTypeStatus = useMemo(() => {
    return EnumHelper({ type: "employmentType", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noticePeriodStatus = useMemo(() => {
    return EnumHelper({ type: "noticePeriod", options: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modifyExistingPayload = (payload) => {
    // check password and confirmPassword are same or not
    if (payload.password !== payload.confirmPassword) {
      toastError({ message: "Password and Confirm Password are not same" });
      return;
    }
    const preparedPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      country: payload.country,
      zipCode: payload.zipCode,
      experience: payload.experience.value,
      startDate: payload.startDate.value,
      recommendedBy: payload.recommendedBy,
      recommendedTo: payload.recommendedTo,
      password: payload.password,
      profession_id: payload.profession.profession_id,
      employment_type_id: payload.employmentType.employment_type_id,
    };

    return preparedPayload;
  };

  const onSubmit = (res) => {
    if (res) {
      toastSuccess({
        message:
          "Successful! Your Account Has Created, Please Verify Your Email.",
      });
    }
    router.push(LINKS.EmailVerification.path);
  };

  return (
    <Form
      formType="add"
      addAPI={ApiKit.signup.postSignup}
      onSubmitSuccess={onSubmit}
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
                      <Label htmlFor="firstName">First Name *</Label>
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
                      <Label htmlFor="lastName">Last Name *</Label>
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
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
                    message: "Invalid email address",
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
                      <Label htmlFor="email">Email *</Label>
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
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: false,
                    message: "This field is optional",
                  },
                  maxLength: {
                    value: 15,
                    message: "Max length is 15 characters",
                  },
                }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="number">Phon Number *</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Phon Number"
                        error={errors.phoneNumber}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.phoneNumber && (
                        <ErrorMessage message={errors.phoneNumber.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="country"
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
                      <Label htmlFor="country">Country *</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter Country Name"
                        error={errors.country}
                        required={true}
                        onChange={onChange}
                      />
                      {errors.country && (
                        <ErrorMessage message={errors.country.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="zipCode"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="code">Zip Code/Postal Code *</Label>
                      <TextInput
                        type="number"
                        value={value}
                        placeholder="Enter your Zip Code/Postal Code"
                        error={errors.zipCode}
                        canNegativeNumber={false}
                        onChange={onChange}
                      />
                      {errors.zipCode && (
                        <ErrorMessage message={errors.zipCode.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
              <Controller
                name="profession"
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
                      <Label htmlFor="profession">Profession *</Label>
                      <Select
                        type={ASYNC_SELECT}
                        cacheOptions
                        defaultOptions
                        closeMenuOnSelect
                        isClearable={false}
                        loadOptions={loadProfessionOptions}
                        value={getSelectValue(professionOptions, value)}
                        getOptionLabel={(option) =>
                          `${get(option, "profession_name", "")}`
                        }
                        getOptionValue={(option) =>
                          get(option, "profession_id", "")
                        }
                        placeholder={"Select Profession"}
                        onChange={onChange}
                      />
                      {errors.profession && (
                        <ErrorMessage message={errors.profession.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="specialty"
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
                      <Label htmlFor="specialty">Specialty *</Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder="Enter your specialty"
                        error={errors.specialty}
                        disabled={false}
                        required={false}
                        isClearable={false}
                        canNegativeNumber={true}
                        onChange={onChange}
                      />
                      {errors.specialty && (
                        <ErrorMessage message={errors.specialty.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-end md:gap-3">
              <Controller
                name="experience"
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
                      <Label htmlFor="experience">Experience *</Label>
                      <Select
                        options={experienceStatus}
                        value={value}
                        placeholder={"Select Experience"}
                        onChange={onChange}
                      />
                      {errors.experience && (
                        <ErrorMessage message={errors.experience.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="employmentType"
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
                      <Label htmlFor="employmentType">
                        What’s the primary employment type you’re looking for?*
                      </Label>
                      <Select
                        type={ASYNC_SELECT}
                        cacheOptions
                        defaultOptions
                        closeMenuOnSelect
                        isClearable={false}
                        loadOptions={loadEmploymentTypeOptions}
                        value={getSelectValueForEmploymentType(
                          employmentTypeOptions,
                          value
                        )}
                        getOptionLabel={(option) =>
                          `${get(option, "type_name", "")}`
                        }
                        getOptionValue={(option) =>
                          get(option, "employment_type_id", "")
                        }
                        placeholder={"Select Employment Type"}
                        onChange={onChange}
                      />
                      {errors.employmentType && (
                        <ErrorMessage message={errors.employmentType.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label htmlFor="notice">
                      How soon would you like to start?(OPTIONAL)
                    </Label>
                    <Select
                      options={noticePeriodStatus}
                      value={value}
                      placeholder={"Select Notice Period"}
                      onChange={onChange}
                    />
                    {errors.startDate && (
                      <ErrorMessage message={errors.startDate.message} />
                    )}
                  </div>
                );
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 md:items-end">
              <Controller
                name="recommendedBy"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="recommendedBy">
                        Were you recommended by anyone? (Optional)
                      </Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder=""
                        error={errors.recommendedBy}
                        onChange={onChange}
                      />
                      {errors.recommendedBy && (
                        <ErrorMessage message={errors.recommendedBy.message} />
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="recommendedTo"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  return (
                    <div className="my-3 flex flex-col">
                      <Label htmlFor="recommendedTo">
                        Recruiter you were recommended to? (Optional)
                      </Label>
                      <TextInput
                        type="text"
                        value={value}
                        placeholder=""
                        error={errors.recommendedTo}
                        onChange={onChange}
                      />
                      {errors.recommendedTo && (
                        <ErrorMessage message={errors.recommendedTo.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
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
                    <Label htmlFor="password">Password *</Label>
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
            <Controller
              name="confirmPassword"
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
                  message: "Min length is 7 characters",
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
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <PasswordInput
                      value={value}
                      placeholder="Enter your Password Again"
                      error={errors.confirmPassword}
                      required={true}
                      onChange={onChange}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage message={errors.confirmPassword.message} />
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

export default SignUpForm;
