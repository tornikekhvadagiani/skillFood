import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/navbar/Navbar";

const ProtectedLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/registration/login/users" replace />
  );
};

export default ProtectedLayout;
