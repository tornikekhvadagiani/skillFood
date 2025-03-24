import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <>
      <h1>Outlet</h1>
      <Outlet />
    </>
  ) : (
    <Navigate to="/registration/login" replace />
  );
};

export default ProtectedLayout;
