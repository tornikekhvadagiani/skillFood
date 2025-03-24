import React, { useEffect, useState } from "react";

import ButtonsList from "../ButtonsList";
import LoginForm from "./LoginForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginType } = useParams();

  useEffect(() => {
    navigate(`/registration/login/${loginType}`);
    switch (loginType) {
      case "users":
        setActiveIndex(0);
        break;
      case "couriers":
        setActiveIndex(1);
        break;
      case "admins":
        setActiveIndex(2);
        break;
    }
  }, [loginType]);
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-10">
      <div className="text-center  w-full">
        <div className="flex justify-center">
          <ButtonsList
            isLoginForm
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <h1 className="text-2xl font-bold mt-5 text-var-blue">
          {loginType && loginType[0].toUpperCase() + loginType?.slice(1)} Login
        </h1>
        <div className=" h-full flex flex-col justify-center ">
          <LoginForm loginType={isString(loginType) ? loginType : ""} />
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
