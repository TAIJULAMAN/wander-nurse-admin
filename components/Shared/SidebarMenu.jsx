import useWindowDimensions from "@/utilities/useWindowDimensions";

import { inject, observer } from "mobx-react";
import Link from "next/link";
import React, { forwardRef, useEffect, useState } from "react";
import isEqual from "react-fast-compare";

const MIN_WIDTH_SCREEN = 980;

const SidebarMenu = forwardRef(
  (
    {
      title = "",
      path = "",
      Icon = null,
      expandMenuList = [],
      checkExpandMenu = "",
      styles = "",
      uiStore,
      isPermitted,
      step,
      newTab,
      active,
    },
    ref
  ) => {
    const { width } = useWindowDimensions();
    const [isDesktop, setIsDesktop] = useState(width >= MIN_WIDTH_SCREEN);

    const { setCurrentExpandedMenus, toggleSidebar, isSidebarOpen } = uiStore;

    const onToggleMenu = (event) => {
      event.stopPropagation();
      if (!isDesktop) {
        toggleSidebar();
      }
      setCurrentExpandedMenus(expandMenuList, checkExpandMenu);
    };

    useEffect(() => {
      if (width >= MIN_WIDTH_SCREEN) {
        if (!isDesktop) {
          setIsDesktop(true);
        }
      } else {
        if (isDesktop) {
          setIsDesktop(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    useEffect(() => {
      if (isDesktop && isSidebarOpen) {
        toggleSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDesktop]);

    return (
      <li className="">
        {isPermitted ? (
          <Link
            href={path}
            passHref={newTab ? true : false}
            className={`flex items-center align-middle py-2 font-medium hover:bg-sidebarMenuBg hover:text-sidebarMenu text-left pr-4 ${
              Icon ? "pl-4" : step === 2 ? "pl-[52px]" : "pl-16"
            } ${active ? "text-secondary" : ""} ${
              active && step === 1 ? "bg-sidebarMenuBg bg-opacity-90" : ""
            } ${active && step === 2 ? "bg-sidebarMenuBg bg-opacity-60" : ""} ${
              active && step === 3 ? "bg-sidebarMenuBg bg-opacity-30" : ""
            } ${styles}`}
            onClick={onToggleMenu}
            target={newTab ? "_blank" : ""}
            rel="noopener noreferrer"
            prefetch={false}
          >
            {Icon ? Icon : <></>}
            <p className="mt-[2px]">{title}</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
    );
  }
);

SidebarMenu.displayName = "SidebarMenu";

export default React.memo(inject("uiStore")(observer(SidebarMenu)), isEqual);
