"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LINKS } from "../../constants/Links";
import { cn } from "../../utilities/cn";

const SettingsLayout = (props) => {
  const pathname = usePathname();

  const isActive = (p) => {
    if (pathname === p) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col sm:flex-row m-4 sm:m-8">
      <ul className="w-72 text-accent">
        <li className="mb-4">
          <Link
            rel="noopener noreferrer"
            prefetch={false}
            href={LINKS.SettingsGeneral.path}
            className={cn(
              `border-l-4 border-transparent p-2 hover:border-teal duration-300`,
              isActive(LINKS.SettingsGeneral.path)
                ? "border-teal font-medium"
                : ""
            )}
          >
            General
          </Link>
        </li>
        <li className="my-4">
          <Link
            rel="noopener noreferrer"
            prefetch={false}
            href={LINKS.SettingsSecurity.path}
            className={cn(
              `border-l-4 border-transparent p-2 hover:border-teal duration-300`,
              isActive(LINKS.SettingsSecurity.path)
                ? "border-teal font-medium"
                : ""
            )}
          >
            Security
          </Link>
        </li>
      </ul>
      {props.children}
    </div>
  );
};

export default SettingsLayout;
