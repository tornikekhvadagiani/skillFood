import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        <NavLink
          to={"/"}
          className={
            "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-all "
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"profile"}
          className={
            "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 transition-all"
          }
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarLinks;
