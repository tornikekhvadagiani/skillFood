import { useParams } from "react-router-dom";
import useGetRequest from "../../hooks/useGetRequest";
import AccountInfo from "./components/AccountInfo";
import AcountInfoHeader from "./components/AcountInfoHeader";
import ProfilePicture from "./components/ProfilePicture";
import SecurityButtons from "./components/SecurityButtons";
import useUser from "../../store/useUser";

export default function Profile() {
  const { user } = useUser();
  const { uuid, role } = useParams();
  const { VITE_COURIERS_KEY, VITE_USERS_KEY, VITE_API_URL } = import.meta.env;
  const correctEndPoint = role === "users" ? "users" : "couriers";

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

  const { data, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: correctKey(),
    endPoint: correctEndPoint,
    uuid: uuid || "",
  });

  const userData = Array.isArray(data) ? data[0] : data;
  console.log(`userdata`, userData);
  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-center">
      <div className="bg-gray-100 px-30 py-4">
        {uuid && loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="flex justify-center">
              <ProfilePicture
                isEditing={uuid}
                editingPicture={
                  typeof userData?.profilepicture === "string"
                    ? userData.profilepicture
                    : ""
                }
              />
            </div>
            <AcountInfoHeader
              editingFirstName={userData?.firstname || ""}
              editingLastName={userData?.lastname || ""}
              isEditing={Boolean(uuid)}
            />
            <div>
              <p className="text-subBlack2 font-pbold text-xl tracking-widest">
                Account information
              </p>
              <AccountInfo
                email={(uuid && userData?.email) || user?.email || ""}
                firstname={
                  (uuid && userData?.firstname) || user?.firstname || ""
                }
                lastname={(uuid && userData?.lastname) || user?.lastname || ""}
                password={(uuid && userData?.password) || user?.password || ""}
                personalId={
                  (uuid && userData?.personalId) || user?.personalId || ""
                }
                phone={(uuid && userData?.phone) || user?.phone || ""}
                lat={(uuid && userData?.lat) || user?.lat || ""}
                lng={(uuid && userData?.lng) || user?.lng || ""}
                vehicle={(uuid && userData?.vehicle) || user?.vehicle || ""}
              />
            </div>
            <SecurityButtons />
          </>
        )}
      </div>
    </div>
  );
}
