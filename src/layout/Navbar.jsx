import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbAirBalloon } from "react-icons/tb";
import { countryCurrencySymbols } from "@/utils/countryCurrencySymbols";

import { setCountry, setCurrency } from "@/redux/slices/countryCurrencySlice";

import { RiStackFill } from "react-icons/ri";

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
    // Get the current URL
    const currentURL = location.pathname;

    // Get all the anchor elements in the menu
    const menuItems = document.querySelectorAll("#navbar li a");

    // Loop through the anchor elements and compare href with the current URL
    menuItems.forEach((item) => {
      if (item.getAttribute("href") === currentURL) {
        item.children[0].children[0].classList.add("active-link");
      } else {
        item.children[0].children[0].classList.remove("active-link");
      }
    });

    window.addEventListener("scroll", handleScroll);

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
            ? "fixed min-w-[70%] left-50 w-full mx-auto"
            : "max-w-7xl mx-auto w-full"
        } top-0 z-10 bg-prime `}
      >
        <div className="md:mx-8 flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center justify-center md:justify-normal w-full md:w-auto">
            <Link to="/">
              <img src="/logo-white.png" alt="logo" width={120} />
            </Link>
          </div>
          <div className="flex md:order-2 mx-4 gap-3 items-center justify-center w-full md:w-auto pb-4 md:pb-2 lg:pb-0">
            {/* Language And Country */}
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md  font-medium  shadow-sm align-middle focus:outline-none focus:ring-0 transition-all text-sm text-white border"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: currencySymbol || "",
                  }}
                />

                {abbreviation}

                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
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
                className="hs-dropdown-toggle py-1.5 px-3 inline-flex justify-center items-center gap-2 rounded-md  font-medium  shadow-sm align-middle focus:outline-none focus:ring-0 transition-all text-sm text-white border"
              >
                <img
                  src={countryIcon}
                  alt={country}
                  className="rounded-full"
                  width={24}
                />
                {country}
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
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
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-gray-950 shadow-md rounded-lg p-2"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-900 rounded-t-lg">
                    <p className="text-sm text-gray-50">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-50">
                      {user?.email}
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0 space-y-2">
                    <Link to="/dashboard">
                      <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md  text-gray-50 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-500">
                        <LuLayoutDashboard fontSize={22} />
                        Dashboard
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                      }}
                      className="flex w-full items-center gap-x-3.5 focus:ring-0 focus:outline-none px-3 py-2 rounded-md btn-gradient"
                    >
                      <HiOutlineLogout fontSize={24} />
                      Logout
                    </button>
                  </div>
                </div>
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
            className={`hs-collapse transition-all duration-300 items-center justify-between ${
              isFixed ? "" : "hidden"
            } w-full md:w-auto md:order-1`}
          >
            <ul
              id="navbar"
              className="flex p-2 md:p-0 mt-4 font-semibold justify-evenly md:flex-row md:gap-x-10 md:mt-0 md:border-0"
            >
              <li>
                <Link to="/car/">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <AiOutlineCar fontSize={24} className="mx-auto" />
                    Car Rental
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/flight/">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <MdOutlineFlight
                      fontSize={24}
                      className="mx-auto rotate-45"
                    />
                    Flight
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/hotel/">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <RiHotelLine fontSize={24} className="mx-auto" />
                    Hotel
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/bus/">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <MdDirectionsBus fontSize={24} className="mx-auto" />
                    Bus
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/package/">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <TbAirBalloon fontSize={24} className="mx-auto" />
                    Packages
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/forex">
                  <div className="text-center text-xs gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <RiStackFill fontSize={24} className="mx-auto" />
                    Forex
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
