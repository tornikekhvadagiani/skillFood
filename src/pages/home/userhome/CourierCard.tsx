import React from "react";
import {
  IUserApiDefaultInfo,
  UserData,
} from "../../../interfaces/user-interface";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";
import BlueButton from "../../../components/BlueButton";
import useUser from "../../../store/useUser";

interface ICurierCard {
  courier: UserData & IUserApiDefaultInfo;
  callCourier: () => Promise<void>;
  removeCourier: () => Promise<void>;
  isAlreadyCalled: boolean;
  userCalled: string[];
}
const CourierCard: React.FC<ICurierCard> = ({
  courier,
  callCourier,
  isAlreadyCalled,
  removeCourier,
}) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    profilepicture,
    vehicle,
    dates,
    userCalled,
  } = courier;
  const { user } = useUser();

  return (
    <div
      className={`min-w-[400px] rounded-2xl overflow-hidden shadow-2xl
         bg-white p-4 dark:bg-gray-800 hover:scale-[1.03] transition duration-400 `}
    >
      <img
        className="w-32 h-32 object-cover rounded-full mx-auto"
        src={isString(profilepicture) ? profilepicture : ""}
        alt={`${firstname} ${lastname}`}
      />
      <div className="text-center mt-4">
        <h2 className="text-lg font-bold dark:text-white">
          {firstname} {lastname}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">{email}</p>
        <p className="text-gray-500 dark:text-gray-300">{phone}</p>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold dark:text-white">
          FirstName:
          <span className="text-gray-600 dark:text-gray-300">{firstname}</span>
        </p>
        <p className="text-sm font-semibold dark:text-white">
          LastName:{" "}
          <span className="text-gray-600 dark:text-gray-300">{lastname}</span>
        </p>
        <p className="text-sm font-semibold dark:text-white">
          Vehicle:{" "}
          <span className="text-gray-600 dark:text-gray-300">{vehicle}</span>
        </p>
        <p className="text-sm font-semibold dark:text-white">
          How many people called the customer:
          <span className="text-gray-600 dark:text-gray-300">
            {userCalled?.length}
          </span>
        </p>

        <p className="text-sm font-semibold dark:text-white mb-2">Schedule:</p>
        {dates && Object.keys(dates).length > 0 ? (
          <ul className="text-gray-600 h-[100px] overflow-y-auto  dark:text-gray-300 space-y-1">
            {Object.entries(dates)
              .filter(([_, hours]) => hours.length > 0)
              .map(([day, hours]) => (
                <li key={day} className="text-sm">
                  <span className="font-medium dark:text-white">{day}:</span>{" "}
                  {hours.join(", ")}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No available hours</p>
        )}
      </div>
      {user?._data_type !== "couriers" && (
        <div className="py-4 flex justify-center">
          {isAlreadyCalled ? (
            <BlueButton
              active={true}
              onClick={removeCourier}
              title="Remove Courier"
            />
          ) : (
            <BlueButton
              active={false}
              onClick={callCourier}
              title="Call Courier"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CourierCard;
