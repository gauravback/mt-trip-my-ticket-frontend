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
    zIndex: isFixed ? 1000 : "auto",
  };

  return (
    <div>
      <nav
        style={navbarStyle}
        className={`w-full ${
          isFixed ? "fixed" : ""
        } top-0 z-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black`}
      >
        <div className="md:mx-8 flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo-white.png" alt="logo" width={120} />
            </Link>
          </div>
          <div className="flex md:order-2 mx-4 space-x-3">
            {/* Language And Country */}
            <div className="hs-dropdown relative inline-flex  [--auto-close:false]">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-transparent text-gray-50 shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
              >
                {abbreviation}
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                <div className="space-y-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <select
                      onChange={(e) => {
                        dispatch(setCountry(e.target.value));
                      }}
                      className="py-3 px-4 pr-9 block w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-0"
                    >
                      <option>{country}</option>
                      {countryCurrencySymbols?.map((elem) => (
                        <option
                          value={elem.country}
                          key={elem.country}
                          style={{
                            display:
                              elem.country === country ? "none" : "block",
                          }}
                        >
                          {elem.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Currency
                    </label>
                    <select
                      onChange={(e) => {
                        dispatch(setCurrency(e.target.value));
                      }}
                      className="py-3 px-4 pr-9 block w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-0"
                    >
                      <option selected value={abbreviation}>
                        {abbreviation}
                      </option>
                      {Array.from(
                        new Set(
                          countryCurrencySymbols.map(
                            (elem) => elem.abbreviation
                          )
                        )
                      ).map((abbreviation) => (
                        <option key={abbreviation} value={abbreviation}>
                          {abbreviation}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="w-full">
                    <label className="block text-sm font-medium mb-2">
                      Language
                    </label>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-0">
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="arabic">Arabic</option>
                    </select>
                  </div> */}
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
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg- align-middle hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs"
                >
                  <div className="h-[2.375rem] w-[2.375rem] rounded-full bg-gray-50 text-gray-950 flex items-center justify-center text-lg">
                    {user?.email.slice(0, 1).toUpperCase()}
                  </div>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-gray-950 shadow-md rounded-lg p-2"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-900 rounded-t-lg">
                    <p className="text-sm text-gray-50">Signed in as</p>
                    <p className="text-sm font-medium text-gray-50">
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
                      className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md  text-gray-50 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-500"
                    >
                      <HiOutlineLogout fontSize={24} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-x-2 font-medium text-gray-50 transition-all duration-500 px-3 py-1 rounded-full hover:text-gray-100">
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
                  Login
                </button>
              </Link>
            )}

            <div className="sm:hidden">
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
            className="hs-collapse transition-all duration-300 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          >
            <ul
              id="navbar"
              className="flex p-2 md:p-0 mt-4 font-semibold justify-evenly md:flex-row md:gap-x-10 md:mt-0 md:border-0"
            >
              <li>
                <Link to="/car/">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <AiOutlineCar fontSize={28} className="mx-auto" />
                    Car Rental
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/flight/">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <MdOutlineFlight fontSize={28} className="mx-auto" />
                    Flight
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/hotel/">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <RiHotelLine fontSize={28} className="mx-auto" />
                    Hotel
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/bus/">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <MdDirectionsBus fontSize={28} className="mx-auto" />
                    Bus
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/package/">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <TbAirBalloon fontSize={28} className="mx-auto" />
                    Packages
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/forex">
                  <div className="text-center text-sm gap-x-1 items-center text-gray-50 sm:py-2 nav-link">
                    <RiStackFill fontSize={28} className="mx-auto" />
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
