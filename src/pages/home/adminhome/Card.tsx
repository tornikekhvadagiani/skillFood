import React from "react";
import { UserData } from "../../../interfaces/user-interface";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";
import { useNavigate } from "react-router-dom";

interface ICard {
  onDelete: () => void;
}
const Card: React.FC<UserData & ICard> = ({
  firstname,
  lastname,
  phone,
  email,
  personalId,
  vehicle,
  lat,
  lng,
  profilepicture,
  uuid,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className=" flex w-full h-full items-center justify-center p-6">
      <div className="flex items-center border border-gray-400 rounded-lg p-6 shadow-lg w-full group relative">
        <img
          src={
            isString(profilepicture)
              ? profilepicture
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
          }
          alt="user"
          className="w-[90px] h-[90px] rounded-full mr-6 object-cover"
        />
        <div className="absolute gap-4 bg-var-white-transparent border w-full h-full inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() =>
              navigate(`/profile/${lat ? "users" : "couriers"}/${uuid}`)
            }
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            Edit {lat ? "User" : "Courier"}
          </button>
          <button
            onClick={onDelete}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-all duration-200 ml-2"
          >
            Delete {lat ? "User" : "Courier"}
          </button>
        </div>

        <div className="flex flex-nowrap w-full justify-between text-left ">
          {[
            { key: "First Name", value: firstname },
            { key: "Last Name", value: lastname },
            { key: "Phone", value: phone },
            { key: "Email", value: email },
            { key: "Personal ID", value: personalId },
            { key: "Vehicle", value: vehicle },
            { key: "Latitude", value: lat },
            { key: "Longitude", value: lng },
          ].map(
            (item, index) =>
              item.value && (
                <div
                  key={index}
                  className="flex items-center flex-col w-1/2 min-w-[150px] max-w-[250px] px-3 py-2 "
                >
                  <div className="text-gray-900 font-bold text-lg">
                    {item.key}
                  </div>
                  <div
                    className="text-blue-700 font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ maxWidth: 200 }}
                  >
                    {item.value}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
