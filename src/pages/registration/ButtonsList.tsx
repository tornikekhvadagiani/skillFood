import React, { useState } from "react";
import BlueButton from "../../components/BlueButton";

const ButtonsList = (props: { setRegisterAs: (title: string) => void }) => {
  interface IButtonList {
    title: string;
    setRegisterAs: string;
  }
  const buttonList: IButtonList[] = [
    {
      title: "User",
      setRegisterAs: "user",
    },

    {
      title: "Courier",
      setRegisterAs: "courier",
    },
    {
      title: "Admin",
      setRegisterAs: "admin",
    },
  ];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="flex gap-2 py-2">
      {buttonList.map((e: IButtonList, i: number) => (
        <BlueButton
          key={i}
          title={e.title}
          active={activeIndex === i}
          onClick={() => {
            props.setRegisterAs(e.setRegisterAs);
            setActiveIndex(i);
          }}
        />
      ))}
    </div>
  );
};

export default ButtonsList;
