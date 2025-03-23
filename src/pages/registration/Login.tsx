import React, { useState } from "react";

import ButtonsList from "./ButtonsList";
import CourierRegister from "./RegisterAs/CourierRegister/CourierRegister";
import UserRegister from "./RegisterAs/CourierRegister/UserRegister";

const Login: React.FC = () => {
  const [registerAs, setRegisterAs] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <div className="text-center">
        <h1>Sign In As:</h1>
        <ButtonsList setRegisterAs={setRegisterAs} />
      </div>
      <UserRegister />
    </div>
  );
};

export default Login;
