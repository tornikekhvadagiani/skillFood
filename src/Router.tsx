import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProtectedLayout from "./layouts/ProtectedLayout";

import RegistrationLayout from "./layouts/RegistrationLayout";
import Login from "./pages/registration/Login";
import Register from "./pages/registration/Register";

const Router = () => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/registration" element={<RegistrationLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/" : "/registration/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
