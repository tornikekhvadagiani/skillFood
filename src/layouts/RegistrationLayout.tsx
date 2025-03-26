import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegistrationLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
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
