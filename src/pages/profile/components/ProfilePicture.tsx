import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { isString } from "@cloudinary/url-gen/internal/utils/dataStructureUtils";

const ProfilePicture: React.FC = () => {
  const { user } = useAuth();
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
