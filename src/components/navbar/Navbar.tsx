import React from "react";
import NavbarLinks from "./NavbarLinks";
import { useAuth } from "../../contexts/AuthContext";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center"></div>
            <NavbarLinks />
          </div>
          <div className="flex gap-4 items-center">
            <h1
              className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-all "
              onClick={logout}
            >
              Log Out
            </h1>
            <img
              className="size-10 rounded-full"
              src={
                isString(user?.profilepicture)
                  ? user.profilepicture
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
              }
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
