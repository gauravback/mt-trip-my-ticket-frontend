import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdOutlineFlight,
  MdDirectionsBus,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import { RiHotelLine, RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
import { countryCurrencySymbols } from "@/utils/countryCurrencySymbols";
import { BiSolidDownArrow } from "react-icons/bi";
import { setCountry, setCurrency } from "@/redux/slices/countryCurrencySlice";

import { RiStackFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer?.value);
  const { country, abbreviation } = useSelector(
    (state) => state.countryCurrencyReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    const threshold = 100;

    if (scrollY > threshold) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/forex/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsFixed(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const navbarStyle = {
    position: isFixed ? "fixed" : "static",
    top: isFixed ? 0 : "auto",
    zIndex: isFixed ? 500 : "auto",
  };

  const countryIcon = countryCurrencySymbols.find(
    (elem) => elem.country === country
  )?.icon;

  const currencySymbol = countryCurrencySymbols.find(
    (elem) => elem.abbreviation === abbreviation
  )?.symbolCode;

  return (
    <div className="w-full">
      <nav
        style={navbarStyle}
        className={`${
          isFixed
            ? "fixed min-w-[70%] left-50 w-full mx-auto navbar-bg"
            : "max-w-7xl mx-auto w-full"
        } top-0 z-10 transition-all ease-in-out duration-100`}
      >
        <div className="md:mx-8 flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center justify-center md:justify-normal w-full md:w-auto">
            <Link to="/">
              <img src="/logo-white.png" alt="logo" width={120} />
            </Link>
          </div>
          <div className="flex md:order-2 mx-4 gap-3 items-center justify-center w-full md:w-auto pb-4 md:pb-2 lg:pb-0">
            <Link
              to="/offers"
              className={`${isFixed ? "hidden" : ""} hidden md:block`}
            >
              <div className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm">
                <div>
                  <img src="/icons/sale.png" width={28} alt="" />
                </div>
                <div className="text-left">
                  <p className="text-xs">Super Offers</p>
                  <p className="text-[0.63rem] text-gray-200">
                    Explore great deals & offers
                  </p>
                </div>
              </div>
            </Link>
            {/* Language And Country */}
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md  font-medium  shadow-sm align-middle focus:outline-none focus:ring-0 transition-all text-sm bg-slate-700 text-white"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: currencySymbol || "",
                  }}
                />

                {abbreviation}

                <BiSolidDownArrow />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-[21rem] md:w-96 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                <div className="grid grid-cols-2 gap-2">
                  {Array.from(
                    new Set(
                      countryCurrencySymbols.map((entry) => entry.abbreviation)
                    )
                  )?.map((elem) => {
                    const matchingEntry = countryCurrencySymbols.find(
                      (entry) => entry.abbreviation === elem
                    );

                    return (
                      <button
                        key={elem}
                        onClick={(e) => {
                          dispatch(setCurrency(matchingEntry.abbreviation));
                        }}
                        className="flex items-center bg-white hover:bg-gray-100"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: matchingEntry.symbolCode || "",
                          }}
                        />
                        <span className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500">
                          {matchingEntry.abbreviation}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-1.5 px-3 inline-flex justify-center items-center gap-2 rounded-md  font-medium  shadow-sm align-middle focus:outline-none focus:ring-0 transition-all text-sm bg-slate-700 text-white"
              >
                <img
                  src={countryIcon}
                  alt={country}
                  className="rounded-full"
                  width={24}
                />
                {country}
                <BiSolidDownArrow className="text-white" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-[21rem] md:w-96 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                <div className="grid grid-cols-2 gap-2">
                  {countryCurrencySymbols?.map((elem) => (
                    <button
                      key={elem.country}
                      onClick={(e) => {
                        dispatch(setCountry(elem.country));
                      }}
                      className="flex items-center bg-white hover:bg-gray-100"
                    >
                      <img
                        src={elem.icon}
                        alt={elem.country}
                        className="rounded-full"
                        width={24}
                      />
                      <span className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500">
                        {elem.country}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language And Country End */}
            {user ? (
              <div
                className="hs-dropdown inline-flex mr-2"
                data-hs-dropdown-placement="bottom-right"
              >
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md font-medium bg- align-middle hover:bg-gray-800 focus:outline-none focus:ring-0 transition-all text-xs"
                >
                  <div className="truncate overflow-ellipsis rounded-md gap-1 btn-gradient flex items-center justify-center text-sm px-3 py-2 focus:outline-none focus:ring-0">
                    <svg
                      className="w-4 h-4 font-bold"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fontWeight="700"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Account
                  </div>
                </button>

                {/* New Menu */}
                <div
                  aria-labelledby="hs-dropdown-with-header"
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow "
                  id="dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900">
                      {user?.email}
                    </span>
                  </div>
                  <div
                    className="py-1 text-gray-800"
                    aria-labelledby="dropdown"
                  >
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
                  <div
                    className="py-1 text-gray-800"
                    aria-labelledby="dropdown"
                  >
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

                {/* New Menu End */}
              </div>
            ) : (
              <button
                type="button"
                id="login-btn"
                data-hs-overlay="#hs-modal-signin"
                className="flex items-center gap-x-2 font-medium transition-all duration-500 px-3 py-3 md:py-2 rounded-md btn-gradient"
              >
                <svg
                  className="w-4 h-4 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fontWeight="700"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                <span className="hidden md:block">Login</span>
              </button>
            )}

            <div className="hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-600 transition-all text-sm"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className={`hs-collapse transition-all ease-in-out duration-300 items-center justify-between ${
              isFixed ? "" : "hidden"
            } w-full md:w-auto md:order-1`}
          >
            <ul
              id="navbar"
              className="flex p-2 md:p-0 mt-4 font-semibold justify-evenly md:flex-row md:gap-x-10 md:mt-0 md:border-0"
            >
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/car/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <AiOutlineCar fontSize={24} className="mx-auto" /> */}
                      <img
                        src="/icons/car.png"
                        width={28}
                        className="mx-auto"
                        alt=""
                      />
                      Car Rental
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/car/economy-car">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Economy Car
                      </p>
                    </Link>

                    <Link to="/car/compact-car">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Compact Car
                      </p>
                    </Link>

                    <Link to="/car/midsize-car">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Midsize Car
                      </p>
                    </Link>

                    <Link to="/car/full-size-car">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Full-Size Car
                      </p>
                    </Link>

                    <Link to="/car/suv">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        SUV
                      </p>
                    </Link>

                    <Link to="/car/luxury-car">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Luxury Car
                      </p>
                    </Link>

                    <Link to="/car/convertible">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Convertible
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/flight/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <MdOutlineFlight fontSize={24} className="mx-auto" /> */}
                      <img src="/icons/plane.png" width={28} alt="" />
                      Flight
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/flight/economy-class">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Economy Class
                      </p>
                    </Link>

                    <Link to="/flight/premium-economy-class">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Premium Economy Class
                      </p>
                    </Link>

                    <Link to="/flight/business-class">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Business Class
                      </p>
                    </Link>

                    <Link to="/flight/first-class">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        First Class
                      </p>
                    </Link>

                    <Link to="/flight/domestic-flight">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Domestic Flight
                      </p>
                    </Link>

                    <Link to="/flight/international-flight">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        International Flight
                      </p>
                    </Link>

                    <Link to="/flight/round-trip-flight">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Round-Trip Flight
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/hotel/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <RiHotelLine fontSize={24} className="mx-auto" /> */}
                      <img src="/icons/hotel.png" width={28} alt="" />
                      Hotel
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/hotel/budget-hotel">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Budget Hotel
                      </p>
                    </Link>

                    <Link to="/hotel/boutique-hotel">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Boutique Hotel
                      </p>
                    </Link>

                    <Link to="/hotel/luxury-hotel">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Luxury Hotel
                      </p>
                    </Link>

                    <Link to="/hotel/resort">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Resort
                      </p>
                    </Link>

                    <Link to="/hotel/motel">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Motel
                      </p>
                    </Link>

                    <Link to="/hotel/bed-and-breakfast">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Bed and Breakfast
                      </p>
                    </Link>

                    <Link to="/hotel/extended-stay-hotel">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Extended Stay Hotel
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/bus/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <MdDirectionsBus fontSize={24} className="mx-auto" /> */}
                      <img src="/icons/bus.png" width={28} alt="" />
                      Bus
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/bus/city-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        City Bus
                      </p>
                    </Link>

                    <Link to="/bus/intercity-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Intercity Bus
                      </p>
                    </Link>

                    <Link to="/bus/sleeper-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Sleeper Bus
                      </p>
                    </Link>

                    <Link to="/bus/luxury-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Luxury Bus
                      </p>
                    </Link>

                    <Link to="/bus/coach-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Coach Bus
                      </p>
                    </Link>

                    <Link to="/bus/double-decker-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Double-Decker Bus
                      </p>
                    </Link>

                    <Link to="/bus/shuttle-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Shuttle Bus
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/package/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <TbAirBalloon fontSize={24} className="mx-auto" /> */}
                      <img
                        src="/icons/luggage.png"
                        className="mx-auto"
                        width={28}
                        alt=""
                      />
                      Package
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/package/beach-vacation-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Beach Vacation Package
                      </p>
                    </Link>

                    <Link to="/package/adventure-travel-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Adventure Travel Package
                      </p>
                    </Link>

                    <Link to="/package/honeymoon-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover.bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Honeymoon Package
                      </p>
                    </Link>

                    <Link to="/package/cultural-tour-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Cultural Tour Package
                      </p>
                    </Link>

                    <Link to="/package/ski-vacation-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Ski Vacation Package
                      </p>
                    </Link>

                    <Link to="/package/wildlife-safari-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Wildlife Safari Package
                      </p>
                    </Link>

                    <Link to="/package/cruise-vacation-package">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover.bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Cruise Vacation Package
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/forex/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link"
                    >
                      {/* <RiStackFill fontSize={24} className="mx-auto" /> */}
                      <img src="/icons/forex.png" width={28} alt="" />
                      Forex
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/forex/us-dollar">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        US Dollar (USD)
                      </p>
                    </Link>

                    <Link to="/forex/euro">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Euro (EUR)
                      </p>
                    </Link>

                    <Link to="/forex/british-pound">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        British Pound (GBP)
                      </p>
                    </Link>

                    <Link to="/forex/japanese-yen">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Japanese Yen (JPY)
                      </p>
                    </Link>

                    <Link to="/forex/australian-dollar">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Australian Dollar (AUD)
                      </p>
                    </Link>

                    <Link to="/forex/canadian-dollar">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Canadian Dollar (CAD)
                      </p>
                    </Link>

                    <Link to="/forex/swiss-franc">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Swiss Franc (CHF)
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
