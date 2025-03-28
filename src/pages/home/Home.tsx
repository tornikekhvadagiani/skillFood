import React from "react";
import useUser from "../../store/useUser";
import AdminHome from "./adminhome/AdminHome";
import UserHome from "./userhome/UserHome";

const Home: React.FC = () => {
  const { user } = useUser();
  console.log(user?._data_type);

  switch (user?._data_type) {
    case "admins":
      return <AdminHome />;
    case "users":
      return <UserHome />;
  }
  return <div>Home</div>;
};

export default Home;
