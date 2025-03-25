import React, { useState } from "react";
import CourierRegister from "./RegisterAs/CourierRegister";
import UserRegister from "./RegisterAs/UserRegister";
import ButtonsList from "../ButtonsList";
import { Link } from "react-router-dom";
import AdminRegister from "./RegisterAs/AdminRegister";

const Register: React.FC = () => {
  const RenderRegister = () => {
    switch (registerAs) {
      case "users":
        return <UserRegister />;
      case "couriers":
        return <CourierRegister />;
      case "admins":
        return <AdminRegister />;
      default:
        return null;
    }
  };
  const [registerAs, setRegisterAs] = useState<string>("users");


  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <ButtonsList isLoginForm={false} setRegisterAs={setRegisterAs} />
      <h1 className="text-2xl font-bold mt-5 text-var-blue">
        {registerAs[0].toUpperCase() + registerAs.slice(1)} Register
      </h1>

      {RenderRegister()}
      <Link
        to={"/registration/login/users"}
        className="text-xl cursor-pointer text-var-blue underline "
      >
        Login
      </Link>
    </div>
  );
};

export default Register;
