import React from "react";
import BlueButton from "../../components/BlueButton";

interface IFetchButtons {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const FetchButtons: React.FC<IFetchButtons> = ({
  activeIndex: controlledIndex,
  setActiveIndex: setControlledIndex,
}: IFetchButtons) => {
  return (
    <div className="flex justify-center gap-5 py-10">
      <BlueButton
        active={controlledIndex === 1}
        onClick={() => setControlledIndex(1)}
        title="Fetch users"
      />
      <BlueButton
        active={controlledIndex === 2}
        onClick={() => setControlledIndex(2)}
        title="Fetch couriers"
      />
    </div>
  );
};

export default FetchButtons;
