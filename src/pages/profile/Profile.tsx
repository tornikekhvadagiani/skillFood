import { useEffect, useState } from "react";
import SelectCourierHours from "../../components/SelectCourierHours";
import useGetRequest from "../../hooks/useGetRequest";
import usePutRequest from "../../hooks/usePutRequest";
import { UserData } from "../../interfaces/user-interface";
import AccountInfo from "./components/AccountInfo";
import AcountInfoHeader from "./components/AcountInfoHeader";
import ProfilePicture from "./components/ProfilePicture";
import SecurityButtons from "./components/SecurityButtons";
import { useTransformedWorkingHours } from "../../hooks/useTransformedWorkingHours";
import { useParams } from "react-router-dom";
import useUser from "../../store/useUser";
import CouriersList from "../home/userhome/CouriersList";

export default function Profile() {
  const { user, setUser } = useUser();
  const { uuid, role } = useParams();
  const {
    VITE_COURIERS_KEY,
    VITE_USERS_KEY,
    VITE_API_URL,
    VITE_DATES_KEY,
    VITE_DATES_UUID,
  } = import.meta.env;

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [workingHours, setWorkingHours] = useState<Record<string, string[]>>(
    {}
  );
  const [formattedHourForUpdate, setFormattedHourForUpdate] = useState<Record<
    string,
    string[]
  > | null>(null);

  const transformedWorkingHours = useTransformedWorkingHours(workingHours);

  useEffect(() => {
    if (formattedHourForUpdate) {
      usePutRequest({
        baseUrl: VITE_API_URL,
        key: VITE_COURIERS_KEY,
        data: { dates: formattedHourForUpdate },
        endPoint: `couriers/${uuid ? uuid : user?._uuid}`,
        toastError: "Failed To Update Courier Hours",
        toastSuccess: "Working Hours Updated Successfully",
      })
        .then((e) => {
          console.log("Both updates completed successfully");
          setFormattedHourForUpdate(null);
          console.log("userdata,", userData);
          if (user?.uuid) {
            localStorage.setItem("loginedAccount", JSON.stringify(e));
            setUser(e);
          }

          if (userData?._uuid === user?.uuid) {
            setUser(e);
            localStorage.setItem("loginedAccount", JSON.stringify(e));
          }

          console.log("e,", e);
        })

        .catch((error) =>
          console.error("Error updating courier hours:", error)
        );
    }
  }, [formattedHourForUpdate, VITE_API_URL, VITE_COURIERS_KEY, uuid]);

  const correctKey = () => {
    if (role === "couriers") return VITE_COURIERS_KEY;
    if (role === "users") return VITE_USERS_KEY;
  };

  const updateWorkingHours = async (
    formattedHour: Record<string, string[]>
  ) => {
    try {
      await usePutRequest({
        baseUrl: VITE_API_URL,
        key: VITE_DATES_KEY,
        data: transformedWorkingHours,
        endPoint: `dates/${VITE_DATES_UUID}`,
        toastError: "Failed To Update Dates",
        toastSuccess: "Dates Updated Successfully",
      });
      setFormattedHourForUpdate(formattedHour);
    } catch (error) {
      console.error("Error updating dates:", error);
    }
  };

  const { data, loading } = useGetRequest({
    baseUrl: VITE_API_URL,
    key: correctKey(),
    endPoint: role === "users" ? "users" : "couriers",
    uuid: uuid || "",
  });

  const userData = Array.isArray(data) ? data[0] : data;
  const selectedUser: UserData = (uuid && userData) || user || ({} as UserData);

  const handleTimeSelectionChange = (
    newWorkingHours: Record<string, string[]>
  ) => {
    setWorkingHours(newWorkingHours);
  };
  console.log();

  return (
    <div
      className={`flex flex-col  justify-center  items-center text-center ${
        !selectedUser?.calledCouriers?.length
          ? "h-full w-full"
          : "h-auto mt-10 gap-10"
      }`}
    >
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
                calledCouriers={selectedUser?.calledCouriers}
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
      {uuid && role === "users" && (
        <div>
          <h1>This user has called these couriers</h1>
          <CouriersList />
        </div>
      )}
    </div>
  );
}
