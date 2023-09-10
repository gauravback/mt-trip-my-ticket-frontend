import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, pathname }) => {
  useEffect(() => {
    var modal = document.querySelector("#login-btn");
    if (!token) {
      modal.click()
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
