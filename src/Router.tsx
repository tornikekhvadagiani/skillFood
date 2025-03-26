import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home";
import ProtectedLayout from "./layouts/ProtectedLayout";

import RegistrationLayout from "./layouts/RegistrationLayout";
import Login from "./pages/registration/Login/Login";
import Register from "./pages/registration/Register/Register";
import Profile from "./pages/profile/Profile";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/home/Home";

const Router = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />

          <Route index path="profile" element={<Profile />} />
        </Route>
        <Route path="/registration" element={<RegistrationLayout />}>
          <Route path="login/:loginType" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={!isLoggedIn ? "/" : "/registration/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
