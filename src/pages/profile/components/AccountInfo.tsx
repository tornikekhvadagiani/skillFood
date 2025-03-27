import { useState } from "react";
import { UserData } from "../../../interfaces/user-interface";
import BlueButton from "../../../components/BlueButton";
import AccountDetail from "./AcountDetail";

interface IAccountInfo {
  isEditing: boolean;
}

export default function AccountInfo({
  isEditing,
  ...userData
}: UserData & IAccountInfo) {
  const [editingData, setEditingData] = useState<UserData>(userData);

  const handleInputChange = (key: keyof UserData, newValue: string | File) => {
    setEditingData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const accountDetails: Array<{
    type: "text" | "file";
    key: keyof UserData;
    title: string;
    optional?: boolean;
  }> = [
    { type: "text", key: "firstname", title: "First Name" },
    { type: "text", key: "lastname", title: "Last Name", optional: true },
    { type: "text", key: "phone", title: "Phone" },
    { type: "text", key: "email", title: "Email" },
    { type: "text", key: "password", title: "Password" },
    { type: "text", key: "personalId", title: "Personal ID" },
    { type: "text", key: "vehicle", title: "Vehicle", optional: true },
    { type: "text", key: "lat", title: "Latitude", optional: true },
    { type: "text", key: "lng", title: "Longitude", optional: true },
  ];

  return (
    <div className="flex flex-col gap-1 mt-5">
      {accountDetails.map(({ key, title, type, optional }) => {
        const value = editingData[key];
        const detail = value !== undefined ? String(value) : undefined;

        // Render if detail exists or it's optional
        if (detail || optional) {
          return (
            <AccountDetail
              key={key}
              isEditing={isEditing}
              detail={detail}
              detailTitle={title}
              type={type}
              onChange={(newValue) => handleInputChange(key, newValue)}
            />
          );
        }
        return null;
      })}

      {isEditing && (
        <div className="flex justify-center pt-5">
          <BlueButton
            active={false}
            onClick={() => {}}
            title="Submit Changes"
          />
        </div>
      )}
    </div>
  );
}
