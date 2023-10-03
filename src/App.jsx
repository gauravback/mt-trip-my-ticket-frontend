import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import BookingDetails from "./pages/Booking/BookingDetails";
import HotelDetails from "./pages/Hotel/HotelDetails";
import getIpAndCountry from "./utils/getIpAndCountry";
import Contact from "./pages/Contact/Contact";
import axios from "axios";
import { add } from "./redux/slices/currencyRateSlice";
import Forex from "./pages/Forex/Forex";

import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import About from "./pages/About/About";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage/AnimatedPage";
import Loader from "./components/Loader/Loader";
import Error404 from "./pages/Misc/Error404";
import Profile from "./pages/User/Profile";
import MyTrips from "./pages/User/MyTrips";
import ChangePassword from "./pages/User/ChangePassword";
import Privacy from "./pages/Privacy/Privacy";
import DubaiActivities from "./pages/DubaiActivities/DubaiActivities";
import Checkout from "./pages/Checkout/Checkout";
import CarDetails from "./pages/Car/CarDetails";
import GoogleTranslate from "./utils/GoogleTranslate";
import PackageDetails from "./pages/Package/PackageDetails";
import Offers from "./pages/Offers/Offers";
import Visa from "./pages/Visa/Visa";
import { BsWhatsapp } from "react-icons/bs";
import { SiChatbot } from "react-icons/si";

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
      dispatch(add("Loading"));
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

  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="md:relative">
      <>
        {/* <GoogleTranslate /> */}
        <Suspense fallback={<Loader />}>
          <div className="w-full bg-[#081826]">
            <Navbar />
          </div>

          <Login />
          <Toaster />
          <AnimatePresence mode="wait">
            <div className="min-h-screen h-full mx-auto">
              <Routes key={pathname} location={location}>
                <Route
                  path="/"
                  exact
                  element={
                    <AnimatedPage>
                      <Home />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/flight"
                  element={
                    <AnimatedPage>
                      <Flight />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/car"
                  element={
                    <AnimatedPage>
                      <Car />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/car/:id"
                  element={
                    <AnimatedPage>
                      <CarDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/bus"
                  element={
                    <AnimatedPage>
                      <Bus />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/hotel"
                  element={
                    <AnimatedPage>
                      <Hotel />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/hotel/:id"
                  element={
                    <AnimatedPage>
                      <HotelDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/package"
                  element={
                    <AnimatedPage>
                      <Package />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/package/:id"
                  element={
                    <AnimatedPage>
                      <PackageDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/booking/:id"
                  element={
                    <AnimatedPage>
                      <BookingDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <AnimatedPage>
                      <Contact />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/forex"
                  element={
                    <AnimatedPage>
                      <Forex />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/attractions"
                  element={
                    <AnimatedPage>
                      <DubaiActivities />
                    </AnimatedPage>
                  }
                />

                <Route
                  path="/privacy-policy"
                  element={
                    <AnimatedPage>
                      <Privacy />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/refund-policy"
                  element={
                    <AnimatedPage>
                      <RefundPolicy />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/terms-of-service"
                  element={
                    <AnimatedPage>
                      <TermsOfService />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <AnimatedPage>
                      <About />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/offers"
                  element={
                    <AnimatedPage>
                      <Offers />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/visa"
                  element={
                    <AnimatedPage>
                      <Visa />
                    </AnimatedPage>
                  }
                />
                <Route
                  element={<ProtectedRoute token={token} pathname={pathname} />}
                >
                  <Route
                    path="/profile"
                    element={
                      <AnimatedPage>
                        <Profile />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/my-trips"
                    element={
                      <AnimatedPage>
                        <MyTrips />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/change-password"
                    element={
                      <AnimatedPage>
                        <ChangePassword />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <AnimatedPage>
                        <Checkout />
                      </AnimatedPage>
                    }
                  />
                </Route>
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </AnimatePresence>
          <Footer />
        </Suspense>
      </>
      <a className="fixed bottom-0 right-0 m-8 bg-green-600 text-white p-2.5 rounded-full">
        <BsWhatsapp fontSize={32} />
      </a>
      <a className="fixed bottom-0 right-16 m-8 bg-blue-600 text-white p-2.5 rounded-full">
        <SiChatbot fontSize={32} />
      </a>
    </div>
  );
};

export default App;
