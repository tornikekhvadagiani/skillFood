import React, { useState } from "react";
import BlueButton from "../../components/BlueButton";
import { useNavigate } from "react-router-dom";

interface IButtonListProps {
  setRegisterAs?: (title: string) => void;
  isLoginForm: boolean;
  activeIndex?: number; // Optional controlled prop
  setActiveIndex?: (index: number) => void; // Optional callback to update active index
}

const ButtonsList: React.FC<IButtonListProps> = ({
  setRegisterAs,
  isLoginForm,
  activeIndex: controlledIndex,
  setActiveIndex: setControlledIndex,
}) => {
  const navigate = useNavigate();
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(0);

  const activeIndex = controlledIndex ?? internalActiveIndex;
  const setActiveIndex = setControlledIndex ?? setInternalActiveIndex;

  const buttonList = [
    { title: "User", setRegisterAs: "users" },
    { title: "Courier", setRegisterAs: "couriers" },
    { title: "Admin", setRegisterAs: "admins" },
  ];

  const handleButtonClick = (
    e: { title: string; setRegisterAs: string },
    i: number
  ) => {
    if (isLoginForm) {
      navigate(`/registration/login/${e.setRegisterAs}`);
    } else {
      setRegisterAs?.(e.setRegisterAs);
    }
    setActiveIndex(i);
  };

  return (
    <div className="flex gap-2 py-2">
      {buttonList.map((e, i) => (
        <BlueButton
          key={i}
          title={e.title}
          active={activeIndex === i}
          onClick={() => handleButtonClick(e, i)}
        />
      ))}
    </div>
  );
};

export default ButtonsList;
