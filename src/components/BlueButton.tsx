import React from "react";
import { IBlueButton } from "../interfaces/blue-button-interface";

const BlueButton: React.FC<IBlueButton> = ({ title, onClick, active }) => {
  return (
    <button
      className={`w-[200px] py-2 rounded-md cursor-pointer flex justify-center items-center text-white transition-all duration-300
      ${active ? "bg-blue-800 hover:bg-blue-800" : "bg-var-blue "}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default BlueButton;
