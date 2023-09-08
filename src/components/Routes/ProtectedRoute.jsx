import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, pathname }) => {
  return token ? (
    pathname === "/login" || pathname === "/register" ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    )
  ) : pathname === "/login" || pathname === "/register" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
