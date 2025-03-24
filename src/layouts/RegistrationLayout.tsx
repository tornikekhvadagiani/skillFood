import React from "react";
import { Outlet } from "react-router-dom";

const RegistrationLayout: React.FC = () => {
  return (
    <div className="bg-var-blue w-full h-full flex justify-center items-center">
      <div className="w-[800px] h-[600px] bg-white rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default RegistrationLayout;
