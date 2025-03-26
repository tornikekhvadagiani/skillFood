import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";

import RegistrationLayout from "./layouts/RegistrationLayout";
import Login from "./pages/registration/Login/Login";
import Register from "./pages/registration/Register/Register";
import Profile from "./pages/profile/Profile";

import AdminHome from "./pages/home/adminhome/AdminHome";
import useUser from "./store/useUser";

const Router = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<AdminHome />} />
          <Route index path="profile" element={<Profile />} />
          <Route path="profile/:role/:uuid" element={<Profile />} />
        </Route>
        <Route path="/registration" element={<RegistrationLayout />}>
          <Route path="login/:loginType" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/registration/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
