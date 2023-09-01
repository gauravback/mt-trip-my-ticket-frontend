import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/slices/AuthSlice";
import { Car, Flight, Hotel, Login, Register } from "./pages";
import api from "./api/api";
import Package from "./pages/Package/Package";
import Bus from "./pages/Bus/Bus";
import Dashboard from "./pages/Dashboard/Dashboard";
import BookingDetails from "./pages/Booking/BookingDetails";
import HotelDetails from "./pages/Hotel/HotelDetails";
import getIpAndCountry from "./utils/getIpAndCountry";

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
  //   } catch (error) {
  //     if (error.response.status === 403) {
  //       dispatch(logout());
  //       navigate("/login");
  //     }else{toast.error("Server error", { id: "1" });}
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     checkToken();
  //   }
  // }, [token]);
  useEffect(() => {
    getIpAndCountry(dispatch);
  }, []);
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen mx-auto mt-16 md:mt-0">
        <Toaster />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flight" element={<Flight />} />
          <Route path="/car" element={<Car />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/package" element={<Package />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
