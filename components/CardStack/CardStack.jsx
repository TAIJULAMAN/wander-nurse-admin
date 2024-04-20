"use client";

import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineViewTimeline } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/Links";

function CardStack() {
  const router = useRouter();
  const handleNavigation = (e) => {
    const path = `${LINKS.updateProfile.path}?tab=${e}`;
    router.push(path);
  };
  return (
    <section className="p-5">
      <div className="grid gap-4 grid-cols-3 mmd:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <div
          onClick={() => handleNavigation("time entry")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <IoTimeOutline size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Time Entry
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("shifts")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <MdOutlineViewTimeline size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Shifts
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("schedule")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <AiOutlineSchedule size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Schedule
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("paystubs")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <CiDollar size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Paystubs
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("Accomplishment")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <GiSkills size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Skills
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("tests")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <FaRegNoteSticky size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Tests
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("Certificates")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <GrDocumentText size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Documents
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("Personal")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <CgProfile size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Profile
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("assignments")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <MdOutlineAssignment size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Assignments
            </p>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("offers")}
          className="mb-5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm shadow-secondary duration-300 hover:shadow-lg"
        >
          <div className="p-5 flex flex-col justify-center text-center items-center md:p-5 mmd:p-8 xl:p-10">
            <div>
              <MdOutlineLocalOffer size={40} className="text-4xl font-bold" />
            </div>
            <p className="mt-5 text-base md:text-xl lg:text-2xl xl-text-2xl text-black font-bold">
              Offers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardStack;
