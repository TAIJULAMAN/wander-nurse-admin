import { inject, observer } from "mobx-react";
import React, { forwardRef } from "react";
import isEqual from "react-fast-compare";
import { FaCaretDown } from "react-icons/fa";

const SidebarDropdownMenu = forwardRef(
  (
    {
      title = "",
      Icon = null,
      expandMenuList = [],
      checkExpandMenu = "",
      isPermitted,
      children,
      uiStore,
      step,
      active,
    },
    ref
  ) => {
    const { setCurrentExpandedMenus } = uiStore;

    const onToggleMenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setCurrentExpandedMenus(expandMenuList, checkExpandMenu);
    };

    return (
      <li className="">
        {isPermitted ? (
          <div className={`w-full`}>
            <div
              onClick={onToggleMenu}
              className={`flex cursor-pointer items-center align-middle py-2 pr-2 font-medium hover:bg-sidebarMenuBg hover:text-sidebarMenu hover:text-white ${
                active ? "text-secondary" : ""
              } ${
                active && step === 1 ? "bg-sidebarMenuBg bg-opacity-90" : ""
              } ${
                active && step === 2 ? "bg-sidebarMenuBg bg-opacity-60" : ""
              } ${
                active && step === 3 ? "bg-sidebarMenuBg bg-opacity-30" : ""
              } ${Icon ? "pl-4" : "pl-13"}`}
            >
              {Icon ? Icon : <></>}
              <p className="mt-[2px]">{title}</p>
              <FaCaretDown
                size={16}
                className={`ml-auto transition duration-300 ${
                  active ? "rotate-180" : ""
                }`}
              />
            </div>
            <ul
              className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                active ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {children}
            </ul>
          </div>
        ) : (
          <> </>
        )}
      </li>
    );
  }
);

SidebarDropdownMenu.displayName = "SidebarDropdownMenu";

export default React.memo(
  inject("uiStore")(observer(SidebarDropdownMenu)),
  isEqual
);
