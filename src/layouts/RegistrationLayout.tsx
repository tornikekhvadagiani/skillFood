import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../store/useUser";

const RegistrationLayout: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-var-blue w-full h-full flex justify-center items-center">
      <div className="w-[800px] h-[600px] bg-white rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default RegistrationLayout;
