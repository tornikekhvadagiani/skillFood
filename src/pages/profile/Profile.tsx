import { useParams } from "react-router-dom";
import useGetRequest from "../../hooks/useGetRequest";
import AccountInfo from "./components/AccountInfo";
import AcountInfoHeader from "./components/AcountInfoHeader";
import ProfilePicture from "./components/ProfilePicture";
import SecurityButtons from "./components/SecurityButtons";
import useUser from "../../store/useUser";
import { useEffect, useState } from "react";
import { UserData } from "../../interfaces/user-interface";
import SelectCourierHours from "../../components/SelectCourierHours";
import { useTransformedWorkingHours } from "../../hooks/useTransformedWorkingHours";
import usePutRequest from "../../hooks/usePutRequest";

export default function Profile() {
  const { user } = useUser();
  const { uuid, role } = useParams();
  const { VITE_COURIERS_KEY, VITE_USERS_KEY, VITE_API_URL, VITE_DATES_KEY } =
    import.meta.env;
  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [isEditingHours, setIsEditingHours] = useState<boolean>(false);

  const correctEndPoint = role === "users" ? "users" : "couriers";
  const [workingHours, setWorkingHours] = useState<Record<string, string[]>>(
    {}
  );
  const transformedWorkingHours = useTransformedWorkingHours(workingHours);

  const correctKey = () => {
    switch (role) {
      case "couriers":
        return VITE_COURIERS_KEY;
      case "users":
        return VITE_USERS_KEY;
      default:
        return "";
    }
  };

  const updateWorkingHours = (formatedHour: any) => {
    
    
    usePutRequest({
      baseUrl: VITE_API_URL,
      key: VITE_COURIERS_KEY,
      data: { dates: formatedHour },
      endPoint: `couriers/${uuid}`,
      toastError: "Failed To Update Courier Hours",
      toastSuccess: "Working Hours Updated Successfully",
    }).then(() => {
      usePutRequest({
        baseUrl: VITE_API_URL,
        key: VITE_DATES_KEY,
        data: transformedWorkingHours,
        endPoint: `dates`,
        toastError: "Failed To Update Courier Hours",
        toastSuccess: "Working Hours Updated Successfully",
      });
    });
  };

  const { data, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: correctKey(),
    endPoint: correctEndPoint,
    uuid: uuid || "",
  });

  const userData = Array.isArray(data) ? data[0] : data;
  const selectedUser: UserData = (uuid && userData) || user || ({} as UserData);

  const handleTimeSelectionChange = (
    newWorkingHours: Record<string, string[]>
  ) => {
    setWorkingHours(newWorkingHours);
    console.log("Updated Working Hours:", newWorkingHours);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-center">
      <SelectCourierHours
        isOpen={isEditingHours}
        onTimeSelectionChange={handleTimeSelectionChange}
        setIsOpen={setIsEditingHours}
        updateWorkingHours={updateWorkingHours}
      />
      <div className="bg-gray-100 px-30 py-4">
        {uuid && loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="flex justify-center">
              <ProfilePicture
                isAdminEditing={uuid}
                editingPicture={
                  typeof selectedUser?.profilepicture === "string"
                    ? selectedUser.profilepicture
                    : ""
                }
              />
            </div>
            <AcountInfoHeader
              editingFirstName={selectedUser?.firstname}
              editingLastName={selectedUser?.lastname || ""}
              isEditing={Boolean(uuid)}
            />
            <div>
              <p className="text-subBlack2 font-pbold text-xl tracking-widest">
                Account information
              </p>
              <AccountInfo
                setIsEditing={setIsEditingInfo}
                isEditing={isEditingInfo}
                email={selectedUser?.email}
                firstname={selectedUser?.firstname}
                lastname={selectedUser?.lastname}
                password={selectedUser?.password}
                personalId={selectedUser?.personalId}
                phone={selectedUser?.phone}
                lat={selectedUser?.lat}
                lng={selectedUser?.lng}
                vehicle={selectedUser?.vehicle}
              />
            </div>
            <SecurityButtons
              setIsEditingHours={setIsEditingHours}
              isEditingInfo={isEditingInfo}
              setIsEditingInfo={setIsEditingInfo}
            />
          </>
        )}
      </div>
    </div>
  );
}
