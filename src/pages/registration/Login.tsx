import React, { useState } from "react";

import ButtonsList from "./ButtonsList";
import CourierRegister from "./RegisterAs/CourierRegister/CourierRegister";

const Login: React.FC = () => {
  const [registerAs, setRegisterAs] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <div className="text-center">
        <h1>Sign In As:</h1>
        <ButtonsList setRegisterAs={setRegisterAs} />
      </div>
      <CourierRegister />
    </div>
  );
};

export default Login;
