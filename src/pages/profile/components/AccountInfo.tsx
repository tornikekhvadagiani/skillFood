import { UserData } from "../../../interfaces/user-interface";
import AcountDetail from "./AcountDetail";

export default function AccountInfo({
  firstname,
  lastname,
  phone,
  email,
  password,
  personalId,
  lat,
  lng,
  vehicle,
}: UserData) {
  return (
    <div className="flex flex-col gap-1 mt-5 ">
      <AcountDetail detail={firstname} detailTitle="FirstName" />
      {lastname && <AcountDetail detail={lastname} detailTitle="LastName" />}
      <AcountDetail detail={phone} detailTitle="Phone" />
      <AcountDetail detail={email} detailTitle="Email" />
      <AcountDetail detail={password} detailTitle="Password" />
      <AcountDetail detail={personalId} detailTitle="PersonalId" />

      {lat && <AcountDetail detail={lat} detailTitle="lat" />}
      {lng && <AcountDetail detail={lng} detailTitle="lng" />}
      {vehicle && <AcountDetail detail={vehicle} detailTitle="Vehicle" />}
    </div>
  );
}
