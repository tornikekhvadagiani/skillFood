import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return isLoggedIn ? (
    <>
      <h1>Outlet</h1>
      <Outlet />
    </>
  ) : (
    <Navigate to="/registration/login" replace />
  );
};

export default ProtectedLayout;
