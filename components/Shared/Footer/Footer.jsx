import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import logo from "../../../public/favicon.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  const LinkGroup = ({ children, header }) => {
    return (
      <>
        <div className="w-full sm:w-1/2 lg:w-2/12">
          <div className="my-5 w-full">
            <h4 className="mb-2 text-base font-bold text-secondary">
              {header}
            </h4>
            <ul className="space-y-1">{children}</ul>
          </div>
        </div>
      </>
    );
  };

  const NavLink = ({ link, label }) => {
    return (
      <Link
        href={link}
        rel="noopener noreferrer"
        prefetch={false}
        className="block text-base text-white hover:text-default"
      >
        {label}
      </Link>
    );
  };

  return (
    <footer className="relative z-10 bg-[#22262F]">
      <div className="flex flex-wrap justify-between px-5">
        <div className="w-full sm:w-2/3 lg:w-3/12">
          <div className="my-5 w-full items-start">
            <Link
              rel="noopener noreferrer"
              prefetch={false}
              href="/"
              className="mb-2 relative inline-block w-12 h-12"
            >
              <Image
                src={logo}
                alt="WN Logo"
                layout="fill"
                objectFit="contain"
              />
            </Link>
            <p className="text-base text-white">
              Stay connected with WanderNurse for the latest opportunities and
              updates in healthcare staffing. Join our community today!
            </p>
          </div>
        </div>
        <LinkGroup header="Useful Links">
          <NavLink link="/#" label="Home" />
          <NavLink link="/#" label="About us" />
          <NavLink link="/#" label="Resources" />
          <NavLink link="/#" label="Blog" />
          <NavLink link="/#" label="Employers" />
          <NavLink link="/#" label="Contact us" />
        </LinkGroup>
        <div className="w-full sm:w-1/2 lg:w-3/12 ">
          <div className="my-5 w-full">
            <h4 className="items-start mb-2 text-base font-bold text-secondary">
              Contact
            </h4>
            <div className="space-y-1">
              <p className="flex items-center text-base font-medium gap-2">
                <span className="text-secondary">
                  <FaPhoneAlt />
                </span>
                <span className="text-white hover:text-default">
                  Phone: +1 234 567 890
                </span>
              </p>
              <p className="flex items-center text-base font-medium gap-2">
                <span className="text-secondary">
                  {" "}
                  <HiOutlineMail />
                </span>
                <span className="text-white hover:text-default">
                  {" "}
                  Email: info@example.com{" "}
                </span>
              </p>
              <p className="flex items-center text-base font-medium gap-2">
                <span className="text-secondary">
                  {" "}
                  <HiOutlineLocationMarker />
                </span>
                <span className="text-white hover:text-default">
                  Write Your Address here
                </span>
              </p>
            </div>
            <div className="my-5 ml-5 flex items-center">
              <Link
                rel="noopener noreferrer"
                prefetch={false}
                href=""
                className="rounded hover:bg-default mr-3 flex h-8 w-8 items-center justify-center bg-secondary text-white sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <FaFacebookSquare size={20} />
              </Link>
              <Link
                rel="noopener noreferrer"
                prefetch={false}
                href=""
                className="rounded  hover:bg-default mr-3 flex h-8 w-8 items-center justify-center  bg-secondary text-white sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                rel="noopener noreferrer"
                prefetch={false}
                href=""
                className="rounded hover:bg-default  mr-3 flex h-8 w-8 items-center justify-center  bg-secondary text-white sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <FaYoutube size={20} />
              </Link>
              <Link
                rel="noopener noreferrer"
                prefetch={false}
                href=""
                className="rounded flex h-8 w-8 items-center justify-center  bg-secondary text-white  hover:bg-default  dark:text-white sm:mr-4 lg:mr-3 xl:mr-4"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-between sm:flex text-white m-5">
        <p>
          Copyright © {currentYear && currentYear} Wander Nurse. All rights
          reserved.
        </p>

        <ul className="flex flex-wrap items-center gap-4 sm:text-sm sm:mt-0">
          <li className="hover:text-default cursor-pointer">
            <Link rel="noopener noreferrer" prefetch={false} href="">
              Privacy Policy
            </Link>
          </li>
          <li className="hover:text-default cursor-pointer">
            <Link rel="noopener noreferrer" prefetch={false} href="">
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
