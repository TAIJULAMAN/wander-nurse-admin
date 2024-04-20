"use client";

import React from "react";
import { get, isEmpty } from "lodash";
import ButtonLoader from "../Loader/ButtonLoader";

function PersonalInfo({ data, isLoading }) {
  return (
    <div className="p-5">
      {isEmpty(data) ? (
        <>
          {isLoading ? (
            <ButtonLoader isLoading={isLoading} />
          ) : (
            <p className="text-2xl font-semibold mb-4 text-red-500">
              No data available
            </p>
          )}
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div
            key={data.userId}
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 leading-4 text-black text-base"
          >
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">First Name :</p>
              <p>
                {get(data, "firstName", "") ? get(data, "firstName", "") : "-"}
              </p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Last Name :</p>
              <p>{data.lastName}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Date of Birth :</p>
              <p>{data.dateOfBirth}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Father Name :</p>
              <p>
                {get(data, "fatherName", "")
                  ? get(data, "fatherName", "")
                  : "-"}
              </p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Mother Name :</p>
              <p>{data.motherName}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Email :</p>
              <p>{data.email}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Gender :</p>
              <p>{data.gender}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Region :</p>
              <p>{data.region}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Marital Status :</p>
              <p>{data.maritalStatus}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Phon Number :</p>
              <p>{data.phonNumber}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Nationality :</p>
              <p>{data.nationality}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">National Id :</p>
              <p>{data.nationalId}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Passport Number :</p>
              <p>{data.passportNumber}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Permanent Address :</p>
              <p>{data.permanentAddress}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Present Address :</p>
              <p>{data.presentAddress}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Alternative Mail :</p>
              <p>{data.alternativeEmail}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Country :</p>
              <p>{data.country}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Zip Code :</p>
              <p>{data.zipcode}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Blood Group :</p>
              <p>{data.bloodGroup}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Experience :</p>
              <p>{data.experience}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Specialty :</p>
              <p>{data.specialty}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Employment Type :</p>
              <p>{data.employmentType}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Start Date :</p>
              <p>{data.startDate}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">End Date :</p>
              <p>{data.endDate}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Recommended By :</p>
              <p>{data.recommendedBy}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Recommended To :</p>
              <p>{data.recommendedTo}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Emergency Contact :</p>
              <p>{data.emergencyContact}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Height :</p>
              <p>{data.height}</p>
            </div>
            <div className="flex min-w-0 gap-x-10">
              <p className="font-semibold">Weight :</p>
              <p>{data.weight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfo;
