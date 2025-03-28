import React from "react";
import useUser from "../../../store/useUser";
interface IAcountInfoHeader {
  isEditing: boolean;
  editingFirstName: string;
  editingLastName: string;
}
const AcountInfoHeader: React.FC<IAcountInfoHeader> = ({
  isEditing,
  editingFirstName,
  editingLastName,
}) => {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-1 justify-center text-center mt-6">
      <h3 className=" text-mainBlack  text-2xl font-bold capitalize tracking-widest">
        {isEditing ? editingFirstName : user?.firstname}
      </h3>
      {user?.lastname && (
        <p className=" text-paragraph  text-2xl font-bold capitalize tracking-wider">
          {isEditing ? editingLastName : user?.lastname}
        </p>
      )}
    </div>
  );
};

export default AcountInfoHeader;
