import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/slices/AuthSlice";
import PaymentVerification from "./pages/PaymentVerification";
import { Car, Flight, Hotel, Login, Register } from "./pages";
import api from "./api/api";
import Package from "./pages/Package/Package";
import Bus from "./pages/Bus/Bus";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer?.value?.token);
  const checkToken = async () => {
    try {
      const response = await api.get(`/user/check-token/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const status = await response.status;
      if (status !== 200) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Server error", { id: "1" });
      if (error.response.status === 403) {
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);
  return (
    <div className="bg-greyIsh">
      <Navbar />
      <div className="min-h-screen mx-auto">
        <Toaster />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flight" element={<Flight />} />
          <Route path="/car" element={<Car />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/package" element={<Package />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
