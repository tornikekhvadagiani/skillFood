import React, { useState } from "react";
import CourierRegister from "./RegisterAs/CourierRegister";
import UserRegister from "./RegisterAs/UserRegister";
import ButtonsList from "../ButtonsList";
import { Link } from "react-router-dom";
import AdminRegister from "./RegisterAs/AdminRegister";

const Register: React.FC = () => {
  const a: string = "user";

  const RenderRegister = () => {
    switch (registerAs) {
      case "user":
        return <UserRegister />;
      case "courier":
        return <CourierRegister />;
      case "admin":
        return <AdminRegister />;
      default:
        return null;
    }
  };
  const [registerAs, setRegisterAs] = useState<string>("user");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <ButtonsList setRegisterAs={setRegisterAs} />
      <h1 className="text-2xl font-bold mt-5 text-var-blue">
        {registerAs[0].toUpperCase() + registerAs.slice(1)} Register
      </h1>

      {RenderRegister()}
      <Link
        to={"/registration/login"}
        className="text-xl cursor-pointer text-var-blue underline "
      >
        Login
      </Link>
    </div>
  );
};

export default Register;
