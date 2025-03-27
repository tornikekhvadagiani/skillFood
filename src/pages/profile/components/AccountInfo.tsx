import { useState } from "react";
import { UserData } from "../../../interfaces/user-interface";
import BlueButton from "../../../components/BlueButton";
import AccountDetail from "./AcountDetail";
import usePutRequest from "../../../hooks/usePutRequest";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUser from "../../../store/useUser";

interface IAccountInfo {
  isEditing: boolean;
  setIsEditing: Function;
}

export default function AccountInfo({
  isEditing,
  setIsEditing,
  ...userData
}: UserData & IAccountInfo) {
  const { VITE_API_URL, VITE_COURIERS_KEY, VITE_USERS_KEY, VITE_ADMINS_KEY } =
    import.meta.env;
  const [editingData, setEditingData] = useState<UserData>(userData);
  const { uuid, role } = useParams();
  const { user, setUser } = useUser();

  const handleInputChange = (key: keyof UserData, newValue: string | File) => {
    setEditingData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };
  const filteredData = Object.fromEntries(
    Object.entries(editingData).filter(([key, value]) => value !== undefined)
  );
  const getCorrectKey = () => {
    if (role) {
      switch (role) {
        case "users":
          return VITE_USERS_KEY;
        case "couriers":
          return VITE_COURIERS_KEY;
      }
    } else {
      switch (user?._data_type) {
        case "users":
          return VITE_USERS_KEY;
        case "couriers":
          return VITE_COURIERS_KEY;
        case "admins":
          return VITE_ADMINS_KEY;
      }
    }
  };
  const getCorrectEndPoint = () => {
    if (uuid && role) {
      return `${role}/${uuid}`;
    } else {
      return `${user?._data_type}/${user?._uuid}`;
    }
  };

  const submitEdit = async () => {
    if (Object.values(filteredData).includes("")) {
      toast.error("Please fill all the fields");
      return;
    }
    await usePutRequest({
      baseUrl: VITE_API_URL,
      key: getCorrectKey(),
      data: filteredData,
      endPoint: getCorrectEndPoint(),
      toastError: "Failed To Edit Courier Account",
      toastSuccess: "Courier Account Edited Successfully",
    }).then((newData) => {
      setUser(newData);
      localStorage.setItem("loginedAccount", JSON.stringify(newData));
    });
    setIsEditing(false);
  };

  const accountDetails: Array<{
    type: "text" | "file" | "number";
    key: keyof UserData;
    title: string;
    optional?: boolean;
  }> = [
    { type: "text", key: "firstname", title: "First Name" },
    { type: "text", key: "lastname", title: "Last Name", optional: true },
    { type: "number", key: "phone", title: "Phone" },
    { type: "text", key: "email", title: "Email" },
    { type: "text", key: "password", title: "Password" },
    { type: "text", key: "personalId", title: "Personal ID" },
    { type: "text", key: "vehicle", title: "Vehicle", optional: true },
    { type: "text", key: "lat", title: "Latitude", optional: true },
    { type: "text", key: "lng", title: "Longitude", optional: true },
  ];

  return (
    <div className="flex flex-col gap-1 mt-5">
      {accountDetails.map(({ key, title, type }) => {
        const value = editingData[key];
        const detail = value !== undefined ? String(value) : undefined;

        if (detail !== undefined) {
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
            onClick={() => submitEdit()}
            title="Submit Changes"
          />
        </div>
      )}
    </div>
  );
}
