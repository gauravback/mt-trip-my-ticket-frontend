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

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer?.value?.token);
  // const checkToken = async () => {
  //   try {
  //     const response = await api.get(`/user/check-token/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const status = await response.status;
  //     if (status !== 200) {
  //       dispatch(logout());
  //       navigate("/login");
  //     }
  //   } catch {
  //     toast.error("Server error", { id: "1" });
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     checkToken();
  //   }
  // }, [token]);
  return (
    <div className="min-h-screen mx-auto max-w-[85rem]">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/car" element={<Car />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/payment-verify/:id" element={<PaymentVerification />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
