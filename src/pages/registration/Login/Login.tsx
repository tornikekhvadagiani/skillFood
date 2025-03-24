import React, { useState } from "react";

import ButtonsList from "../ButtonsList";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [registerAs, setRegisterAs] = useState<string>("user");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <div className="text-center  w-full">
        <div className="flex justify-center">
          <ButtonsList setRegisterAs={setRegisterAs} />
        </div>
        <h1 className="text-2xl font-bold mt-5 text-var-blue">
          {registerAs[0].toUpperCase() + registerAs.slice(1)} Login
        </h1>
        <div className=" h-full flex flex-col justify-center ">
          <LoginForm />
        </div>
        <Link
          to={"/registration/register"}
          className="text-xl cursor-pointer text-var-blue underline "
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
