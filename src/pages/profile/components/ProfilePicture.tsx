import React from "react";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";
import useUser from "../../../store/useUser";

const ProfilePicture: React.FC = () => {
  const { user } = useUser();
  const userImageFilter = isString(user?.profilepicture)
    ? user.profilepicture
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png";

  return (
    <img
      className=" h-25 aspect-square rounded-full object-cover"
      src={userImageFilter}
      alt="profileImage"
    />
  );
};

export default ProfilePicture;
