import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiCategory } from "react-icons/bi";
import { BsTelephone, BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { SiChatbot } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import api from "./api/api";
import AnimatedPage from "./components/AnimatedPage/AnimatedPage";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import { Car, Flight, Hotel, Login, Register } from "./pages";
import About from "./pages/About/About";
import Post from "./pages/Blog/Post";
import Posts from "./pages/Blog/Posts";
import BookingDetails from "./pages/Booking/BookingDetails";
import Bus from "./pages/Bus/Bus";
import CarDetails from "./pages/Car/CarDetails";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import CityTourDetails from "./pages/DubaiActivities/CityTourDetails";
import DesertSafariDetails from "./pages/DubaiActivities/DesertSafariDetails";
import DubaiActivities from "./pages/DubaiActivities/DubaiActivities";
import Forex from "./pages/Forex/Forex";
import Home from "./pages/Home";
import HotelDetails from "./pages/Hotel/HotelDetails";
import Error404 from "./pages/Misc/Error404";
import Offers from "./pages/Offers/Offers";
import Package from "./pages/Package/Package";
import PackageDetails from "./pages/Package/PackageDetails";
import Failed from "./pages/Payment/Failed";
import Success from "./pages/Payment/Success";
import Privacy from "./pages/Privacy/Privacy";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import SelfDrive from "./pages/SelfDrive/SelfDrive";
import SelfDriveDetails from "./pages/SelfDrive/SelfDriveDetails";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import ChangePassword from "./pages/User/ChangePassword";
import MyTrips from "./pages/User/MyTrips";
import Profile from "./pages/User/Profile";
import Visa from "./pages/Visa/Visa";
import Yacht from "./pages/Yacht/Yacht";
import YachtDetails from "./pages/Yacht/YachtDetails";
import { logout } from "./redux/slices/AuthSlice";
import { add } from "./redux/slices/currencyRateSlice";
import GoogleTranslate from "./utils/GoogleTranslate";
import getIpAndCountry from "./utils/getIpAndCountry";

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
        `https://forex-tracker.vercel.app/convert/${currency.toLowerCase()}/dPdXSB`
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
  const user = useSelector((state) => state.authReducer?.value);

  return (
    <div className="md:relative">
      <>
        {/* <GoogleTranslate /> */}
        <Suspense fallback={<Loader />}>
          <div className="w-full bg-white">
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
                  path="/yacht"
                  element={
                    <AnimatedPage>
                      <Yacht />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/yacht/:id"
                  element={
                    <AnimatedPage>
                      <YachtDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/payment/success"
                  element={
                    <AnimatedPage>
                      <Success />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/payment/failed"
                  element={
                    <AnimatedPage>
                      <Failed />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <AnimatedPage>
                      <Posts />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/self-drive"
                  element={
                    <AnimatedPage>
                      <SelfDrive />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/self-drive/:id"
                  element={
                    <AnimatedPage>
                      <SelfDriveDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/blog/:slug"
                  element={
                    <AnimatedPage>
                      <Post />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/desert-safari/:id"
                  element={
                    <AnimatedPage>
                      <DesertSafariDetails />
                    </AnimatedPage>
                  }
                />
                <Route
                  path="/city-tour/:id"
                  element={
                    <AnimatedPage>
                      <CityTourDetails />
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
      <nav className="fixed md:hidden bottom-0 mx-auto flex w-full justify-evenly  gap-8 border-t bg-white px-10 p-3 text-xs sm:max-w-md sm:rounded-t-xl sm:border-l sm:border-r sm:text-sm">
        <buttond
          data-hs-overlay="#docs-sidebar"
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
          className="flex  items-center w-1/2 gap-1 transition duration-100 hover:text-gray-500 active:text-gray-600"
        >
          <BiCategory fontSize={20} />
          <span>All Categories</span>
        </buttond>
        <div className="hs-dropdown relative inline-flex justify-center [--placement:top-right] w-1/2">
          <button
            id="hs-dropup"
            className="flex hs-dropdown-toggle  items-center gap-1 transition duration-100 hover:text-gray-500 active:text-gray-600  "
          >
            <RiUserLine fontSize={20} />
            <span>Account</span>
          </button>
          <div
            aria-labelledby="hs-dropdown-with-header"
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 hidden absolute z-[2500] my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow "
            id="dropdown"
          >
            {user ? (
              <div>
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900">
                    {user?.email}
                  </span>
                </div>
                <div className="py-1 text-gray-800" aria-labelledby="dropdown">
                  <Link to="/profile">
                    <p className="flex items-center gap-x-1 py-2 px-4 text-sm hover:bg-gray-100">
                      <FaRegUser /> My Profile
                    </p>
                  </Link>
                  <Link to="/my-trips">
                    <p className="flex items-center gap-x-1 py-2 px-4 text-sm hover:bg-gray-100">
                      <MdOutlineModeOfTravel /> My Trips
                    </p>
                  </Link>
                  <Link to="/change-password">
                    <p className="flex items-center gap-x-1 py-2 px-4 text-sm hover:bg-gray-100">
                      <RiLockPasswordLine /> Change Password
                    </p>
                  </Link>
                </div>
                <div className="py-1 text-gray-800" aria-labelledby="dropdown">
                  <div>
                    <button
                      onClick={() => {
                        dispatch(logout());
                      }}
                      className="flex w-full items-center gap-x-1 py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      <FiLogOut /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                id="login-btn"
                data-hs-overlay="#hs-modal-signin"
                className="flex items-center w-full gap-x-2 font-medium transition-all duration-500 px-3 py-3 md:py-1 rounded-md "
              >
                <FaCircleUser fontSize={22} />
                <span className="">Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      <a className="block fixed  z-[1000] bottom-14 md:bottom-5 right-5   bg-green-600 text-white p-2.5 rounded-full">
        <BsWhatsapp fontSize={32} />
      </a>
      <a className="block fixed  z-[1000] bottom-28 md:bottom-20 right-5   bg-blue-600 text-white p-2.5 rounded-full">
        <SiChatbot fontSize={32} />
      </a>
      <a className="block fixed  z-[1000] bottom-44 md:bottom-36 right-5   bg-cyan-600 text-white p-2.5 rounded-full">
        <BsTelephone fontSize={28} />
      </a>
    </div>
  );
};

export default App;
