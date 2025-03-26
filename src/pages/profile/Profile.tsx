import { useAuth } from "../../contexts/AuthContext";
import AccountInfo from "./components/AccountInfo";
import SecurityButtons from "./components/SecurityButtons";
import AcountInfoHeader from "./components/AcountInfoHeader";
import ProfilePicture from "./components/ProfilePicture";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className=" flex flex-col w-full h-full justify-center items-center text-center">
      <div className="bg-gray-100 px-30 py-4">
        <div className="flex justify-center">
          <ProfilePicture />
        </div>
        <AcountInfoHeader />
        <div className="">
          <p className="text-subBlack2 font-pbold text-xl tracking-widest">
            Account information
          </p>
          <AccountInfo
            email={user?.email ? user.email : ""}
            firstname={user?.firstname ? user.firstname : ""}
            lastname={user?.lastname}
            password={user?.password ? user.password : ""}
            personalId={user?.personalId ? user.personalId : ""}
            phone={user?.phone ? user.phone : ""}
            lat={user?.lat ? user.lat : ""}
            lng={user?.lng ? user.lng : ""}
            vehicle={user?.vehicle ? user.vehicle : ""}
          />
        </div>
        <SecurityButtons />
      </div>
    </div>
  );
}
