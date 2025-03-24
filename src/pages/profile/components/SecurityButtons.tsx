import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
const SecurityButtons: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mt-12">
      <p className="text-subBlack2 font-pbold text-xl tracking-widest">
        Security
      </p>
      <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
        <SecurityButton
          title="Change Acount Details"
          handleClick={() => console.log(true)}
        />
        <SecurityButton
          title="Delete Account"
          handleClick={() => console.log(true)}
        />
        {user?.dates && (
          <SecurityButton
            title="Change Working Hours"
            handleClick={() => console.log(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SecurityButtons;
interface ISecurityButton {
  title: string;
  handleClick: () => void;
}
const SecurityButton: React.FC<ISecurityButton> = ({ title, handleClick }) => {
  return (
    <button
      onClick={() => handleClick()}
      className="h-[42px] w-[250px] tracking-wider text-sm text-white bg-var-blue rounded-md border-none cursor-pointer transition duration-300 hover:bg-blue-400 "
    >
      {title}
    </button>
  );
};
