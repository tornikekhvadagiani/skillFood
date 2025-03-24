import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const AcountInfoHeader: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-1 justify-center text-center mt-6">
      <h3 className=" text-mainBlack  text-2xl font-bold capitalize tracking-widest">
        {user?.firstname}
      </h3>
      {user?.lastname && (
        <p className=" text-paragraph  text-2xl font-bold capitalize tracking-wider">
          {user.lastname}
        </p>
      )}
    </div>
  );
};

export default AcountInfoHeader;
