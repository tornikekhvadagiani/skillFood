import React from "react";
import useUser from "../../store/useUser";
import AdminHome from "./adminhome/AdminHome";
import UserHome from "./userhome/UserHome";
import CourierHome from "./courierhome/CourierHome";

const Home: React.FC = () => {
  const { user } = useUser();

  switch (user?._data_type) {
    case "admins":
      return <AdminHome />;
    case "users":
      return <UserHome />;
    case "couriers":
      return <CourierHome />;
  }
  return <div>Home</div>;
};

export default Home;
