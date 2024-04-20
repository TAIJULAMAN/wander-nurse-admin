import { inject, observer } from "mobx-react";
import Image from "next/legacy/image";
import React, { forwardRef } from "react";
import isEqual from "react-fast-compare";
import { AiFillSetting } from "react-icons/ai";
import {
  FaRegUserCircle,
  FaTachometerAlt,
  FaUser,
  FaUserSecret,
} from "react-icons/fa";
import { MdOutlineLogin, MdOutlineRoomPreferences } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";

import { LINKS } from "../../constants/Links";
import Logo from "./../../public/favicon.png";
import SidebarMenu from "./SidebarMenu";
import { VERSION } from "@/constants/Constant";
import SidebarDropdownMenu from "./SidebarDropdownMenu";
import { FaGraduationCap, FaUserPen } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { GrDocumentText } from "react-icons/gr";

const Sidebar = forwardRef(({ uiStore }, ref) => {
  const { isSidebarOpen, toggleSidebar, currentExpandedMenus } = uiStore;

  const SidebarHeaderItem = (
    <div className="pb-0 pt-2">
      <div className="relative mx-auto w-10 h-10">
        <Image src={Logo} alt="WN Logo" layout="fill" objectFit="contain" />
      </div>
    </div>
  );

  const SidebarFooterItem = (
    <div className="mt-auto border-top list-none">
      <div className="text-center text-xs py-[2px]">
        <span className="text-gray-400">{"Version: " + VERSION}</span>
      </div>
      <SidebarMenu
        active={currentExpandedMenus.includes("settings")}
        title={"SETTINGS"}
        isPermitted={true}
        path={LINKS.SettingsGeneral.path}
        Icon={<AiFillSetting size={18} className="mr-4 w-5" />}
        expandMenuList={["settings"]}
        checkExpandMenu={"settings"}
        step={1}
      />
    </div>
  );

  const DashboardItem = (
    <SidebarMenu
      active={currentExpandedMenus.includes("dashboard")}
      title={LINKS.dashboard.title}
      isPermitted={true}
      path={LINKS.dashboard.path}
      Icon={<FaTachometerAlt size={18} className="mr-4 w-5" />}
      expandMenuList={["dashboard"]}
      checkExpandMenu={"dashboard"}
      step={1}
    />
  );

  const Profile = (
    <SidebarMenu
      active={currentExpandedMenus.includes("profile")}
      title={LINKS.profile.title}
      isPermitted={true}
      path={LINKS.profile.path}
      Icon={<FaUser size={18} className="mr-4 w-5" />}
      expandMenuList={["profile"]}
      checkExpandMenu={"profile"}
      step={1}
    />
  );

  const UpdateProfileTabs = (
    <SidebarDropdownMenu
      active={currentExpandedMenus.includes("update-profile-tabs")}
      title={"Update Profile"}
      isPermitted={true}
      Icon={<FaUserPen size={18} className="mr-4 w-5" />}
      expandMenuList={["update-profile-tabs"]}
      checkExpandMenu={"update-profile-tabs"}
      step={1}
    >
      <SidebarMenu
        active={currentExpandedMenus.includes("personal")}
        title={"Personal Information"}
        isPermitted={true}
        path={`${LINKS.updateProfile.path}?tab=Personal`}
        Icon={<FaRegUserCircle size={18} className="mr-4 w-5" />}
        expandMenuList={["update-profile-tabs", "personal"]}
        checkExpandMenu={"personal"}
        step={2}
      />

      <SidebarMenu
        active={currentExpandedMenus.includes("education")}
        title={"Education / Training"}
        isPermitted={true}
        path={`${LINKS.updateProfile.path}?tab=Education`}
        Icon={<FaGraduationCap size={18} className="mr-4 w-5" />}
        expandMenuList={["update-profile-tabs", "education"]}
        checkExpandMenu={"education"}
        step={2}
      />
      <SidebarMenu
        active={currentExpandedMenus.includes("Employment")}
        title={"Employment"}
        isPermitted={true}
        path={`${LINKS.updateProfile.path}?tab=Employment`}
        Icon={<MdOutlineRoomPreferences size={18} className="mr-4 w-5" />}
        expandMenuList={["update-profile-tabs", "Employment"]}
        checkExpandMenu={"Employment"}
        step={2}
      />
      <SidebarMenu
        active={currentExpandedMenus.includes("Accomplishment")}
        title={"Accomplishment"}
        isPermitted={true}
        path={`${LINKS.updateProfile.path}?tab=Accomplishment`}
        Icon={<GiSkills size={18} className="mr-4 w-5" />}
        expandMenuList={["update-profile-tabs", "Accomplishment"]}
        checkExpandMenu={"Accomplishment"}
        step={2}
      />
      <SidebarMenu
        active={currentExpandedMenus.includes("Certificates")}
        title={"Certificates"}
        isPermitted={true}
        path={`${LINKS.updateProfile.path}?tab=Certificates`}
        Icon={<GrDocumentText size={18} className="mr-4 w-5" />}
        expandMenuList={["update-profile-tabs", "Certificates"]}
        checkExpandMenu={"Certificates"}
        step={2}
      />
    </SidebarDropdownMenu>
  );

  const SignIn = (
    <SidebarMenu
      active={currentExpandedMenus.includes("signin")}
      title={LINKS.signin.title}
      isPermitted={true}
      path={LINKS.signin.path}
      Icon={<MdOutlineLogin size={18} className="mr-4 w-5" />}
      expandMenuList={["signin"]}
      checkExpandMenu={"signin"}
      step={1}
    />
  );
  const SignUp = (
    <SidebarMenu
      active={currentExpandedMenus.includes("signup")}
      title={LINKS.signup.title}
      isPermitted={true}
      path={LINKS.signup.path}
      Icon={<SiGnuprivacyguard size={18} className="mr-4 w-5" />}
      expandMenuList={["signup"]}
      checkExpandMenu={"signup"}
      step={1}
    />
  );

  return (
    <>
      <button
        className={`fixed print:hidden z-40 cursor-default inset-0 bg-slate-400 transition ${
          isSidebarOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></button>
      <aside
        className={`fixed bg-darkSidebar print:hidden z-40 top-0 transition-[left] duration-200 ${
          isSidebarOpen ? "mmd:left-0 left-0" : "mmd:left-0 -left-56"
        } w-56 h-screen flex flex-col z-10`}
      >
        {SidebarHeaderItem}
        <nav className="mt-6 relative overflow-y-scroll scrollbar-hide">
          <h6 className="text-xs font-bold px-4 mb-2">{"MAIN"}</h6>
          <ul className="text-sm">{DashboardItem}</ul>
          <div>
            <h6 className="text-xs font-bold px-4 mt-3 mb-2">{"COMPONENTS"}</h6>
            <ul className="text-sm">{Profile}</ul>
            <ul className="text-sm">{UpdateProfileTabs}</ul>
          </div>
        </nav>
        {SidebarFooterItem}
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default React.memo(inject("uiStore")(observer(Sidebar)), isEqual);
