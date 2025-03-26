import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useUser from "../store/useUser";

const ProtectedLayout: React.FC = () => {
  const { user } = useUser();

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/registration/login/users" replace />
  );
};

export default ProtectedLayout;
