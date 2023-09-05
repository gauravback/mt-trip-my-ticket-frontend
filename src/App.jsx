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
import Contact from "./pages/Contact/Contact";
import axios from "axios";
import { add } from "./redux/slices/currencyRateSlice";
import Forex from "./pages/Forex/Forex";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";

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
      if (error.response.status === 403) {
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error("Server error", { id: "1" });
      }
    }
  };

  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);
  const ipAddress = useSelector((state) => state.IPReducer?.ip);
  const currency = useSelector(
    (state) => state.countryCurrencyReducer?.abbreviation
  );

  const currencyConvert = async (currency) => {
    try {
      const response = await axios.get(
        `https://forex-tracker.vercel.app/convert/${currency.toLowerCase()}`
      );
      const result = await response.data;
      const actionDispatch = await dispatch(add(result.exchangeRate));
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };
  useEffect(() => {
    getIpAndCountry(dispatch, ipAddress);
    currencyConvert(currency);
  }, [currency, ipAddress]);

  return (
    <div className="">
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
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/package" element={<Package />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forex" element={<Forex />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
