import { setCountry, setCurrency } from "@/redux/slices/countryCurrencySlice";
import { countryCurrencySymbols } from "@/utils/countryCurrencySymbols";
import React, { useEffect, useState } from "react";

import { FcAbout } from "react-icons/fc";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  MdOutlineArticle,
  MdOutlineContactPage,
  MdOutlineModeOfTravel,
} from "react-icons/md";
import { RiLockPasswordLine, RiMenu3Line } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { TiThMenu } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";

import Cookies from "js-cookie";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer?.value);
  var defaultCountry = useSelector(
    (state) => state.countryCurrencyReducer?.country
  );

  console.log("Country", defaultCountry);
  const abbreviation = useSelector(
    (state) => state.countryCurrencyReducer?.abbreviation
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

  const currencySymbol = countryCurrencySymbols.find(
    (elem) => elem.abbreviation === abbreviation
  )?.symbolCode;

  const languageCookie = Cookies.get("googtrans");
  const selectedLanguage = Cookies.get("language");

  const defaultLanguage = languageCookie ? languageCookie.split("/")[2] : "en";
  const countryIcon = countryCurrencySymbols.find(
    (elem) => elem.languageAbbreviation === defaultLanguage
  )?.icon;
  // const selectedLanguage = countryCurrencySymbols.find(
  //   (elem) => elem.abbreviation === abbreviation
  // )?.language;

  const changeLanguage = (languageAbbreviation, language) => {
    Cookies.set("googtrans", `/en/${languageAbbreviation}`);
    Cookies.set("language", `${language}`);
    Cookies.remove("googtrans", {
      domain: `.${window.location.origin}`,
    });
    Cookies.set("googtrans", `/en/${languageAbbreviation}`, {
      domain: `.${window.location.origin}`,
    });
  };

  useEffect(() => {
    const setLanguage = countryCurrencySymbols.find(
      (elem) => elem.languageAbbreviation === defaultLanguage
    )?.language;
    Cookies.set("language", setLanguage);
  }, []);

  const countriesToMap = ["India", "United Arab Emirates"];

  return (
    <div className="w-full">
      <nav
        style={navbarStyle}
        className={`${
          isFixed
            ? "fixed min-w-[70%] left-50 w-full mx-auto "
            : "max-w-7xl mx-auto w-full "
        } top-0 z-10 transition-all ease-in-out duration-100 nav-gradient`}
      >
        <div className="md:mx-8 flex flex-wrap md:flex-nowrap items-center justify-between mx-0">
          <div className="flex md:block justify-between md:justify-normal w-full md:w-auto my-3 md:my-0 items-center">
            <div className="flex  md:flex-row items-center justify-center w-full md:w-auto">
              <button
                type="button"
                className="md:hidden rounded-md p-0.5 "
                data-hs-overlay="#side-menu"
                aria-controls="side-menu"
                aria-label="Toggle navigation"
              >
                <TiThMenu
                  fontSize={20}
                  className="text-gray-50 shadow-gray-50"
                />
              </button>
              <Link to="/">
                <img
                  src="/logo-white-1.png"
                  alt="logo"
                  className="w-48 md:hidden"
                />
              </Link>
              <Link to="/">
                <img
                  src="/logo-1.png"
                  alt="logo"
                  className="w-48 hidden md:block"
                />
              </Link>
            </div>
            <Link to="/offers" className="md:hidden">
              <div className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm">
                <div className="animate-pulse duration-[3000ms]">
                  <img
                    id="superoffers"
                    src="/icons/sale.png"
                    width={200}
                    alt=""
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs">Super Offers</p>
                </div>
              </div>
            </Link>
            <a
              href="tel:+919804480448"
              className="w-full md:w-auto text-center  mr-0 md:hidden"
            >
              <span className="flex items-center justify-center space-x-1">
                <img src="/icons/phone-icon.png" alt="" width={18} />
                <span className="text-white text-xs"> Call Us On:</span>
              </span>
              <span className="text-white font-bold text-xs">
                +919804480448
              </span>
            </a>
          </div>
          <div className=" hidden md:flex flex-wrap md:flex-nowrap md:order-2 mx-4 gap-3 items-center justify-center w-full md:w-auto pb-4 md:pb-2 lg:pb-0">
            <a
              href="tel:+919804480448"
              className="w-full md:w-auto text-center md:block hidden"
            >
              <span className="flex items-center justify-center space-x-1">
                <img src="/icons/phone-icon.png" alt="" width={18} />
                <span className=" text-xs"> Call Us On:</span>
              </span>
              <span className=" font-bold text-xs">+91 9804480448</span>
            </a>
            <Link
              to="/offers"
              className={`${isFixed ? "hidden " : "md:block"} hidden `}
            >
              <div className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm">
                <div className="animate-pulse duration-[3000ms]">
                  <img
                    className=""
                    id="superoffers-desktop"
                    src="/icons/sale.png"
                    width={28}
                    alt=""
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs">Super Offers</p>
                  <p className="text-[0.63rem] ">
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
                className="hs-dropdown-toggle py-1 px-4 inline-flex justify-center items-center gap-2  rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-sm"
              >
                {abbreviation}
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
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
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-full sm:w-[40rem] hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                <div className="grid grid-cols-2 md:grid-cols-2 w-full">
                  {Array.from(
                    new Set(
                      countryCurrencySymbols.map((entry) => entry.abbreviation)
                    )
                  )?.map((elem) => {
                    var matchingEntry = countryCurrencySymbols.find(
                      (entry) => entry.abbreviation === elem
                    );

                    return (
                      <button
                        onClick={() => {
                          dispatch(setCurrency(matchingEntry.abbreviation));
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }}
                        className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-xs text-gray-800 hover:text-theme hover:font-semibold focus:ring-0 focus:outline-none ${
                          abbreviation === matchingEntry.abbreviation
                            ? "font-semibold text-theme"
                            : ""
                        }`}
                      >
                        <span className="text-xs">
                          {matchingEntry.abbreviation}
                        </span>{" "}
                        {matchingEntry.currency}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-1 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle  focus:outline-none focus:ring-0 transition-all text-sm"
              >
                <img
                  src={countryIcon}
                  alt={defaultCountry}
                  className="rounded-full"
                  width={22}
                />
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
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
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-full md:w-[40rem] hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                {" "}
                <div className="grid grid-cols-2 md:grid-cols-3 w-full">
                  {Array.from(
                    new Set(
                      countryCurrencySymbols.map((entry) => entry.language)
                    )
                  )?.map((elem) => {
                    var matchingEntry = countryCurrencySymbols.find(
                      (entry) => entry.language === elem
                    );

                    return (
                      <button
                        onClick={() => {
                          changeLanguage(
                            matchingEntry.languageAbbreviation,
                            matchingEntry.language
                          );
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }}
                        className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:text-theme focus:ring-0 hover:font-semibold ${
                          matchingEntry.languageAbbreviation === defaultLanguage
                            ? "font-semibold text-theme"
                            : ""
                        }`}
                      >
                        <img
                          src={matchingEntry.icon}
                          alt={defaultCountry}
                          className="rounded-full"
                          width={20}
                        />
                        {matchingEntry.language}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-default"
                type="button"
                className="hs-dropdown-toggle py-1 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle  focus:outline-none focus:ring-0 transition-all text-sm"
              >
                <p>{defaultCountry}</p>
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
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
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-full md:w-24 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                {" "}
                <div className="grid grid-cols-1 w-full">
                  {[
                    ...new Set(
                      countryCurrencySymbols
                        .filter((elem) => countriesToMap.includes(elem.country))
                        .map((elem) => elem.country)
                    ),
                  ].map((country) => {
                    const elem = countryCurrencySymbols.find(
                      (item) => item.country === country
                    );

                    return (
                      <button
                        onClick={() => {
                          dispatch(setCountry(elem.country));
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }}
                        key={elem.country}
                        className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:text-theme focus:ring-0 hover:font-semibold ${
                          elem.country === defaultCountry
                            ? "font-semibold text-theme"
                            : ""
                        }`}
                      >
                        <img
                          src={elem.icon}
                          alt={elem.country}
                          className="rounded-full"
                          width={20}
                        />
                        {elem.country}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Language And Country End */}{" "}
            <button
              type="button"
              class="bg-white  md:btn-gradient rounded-full px-1.5 md:px-2 py-1.5 m-0 flex items-center justify-center md:w-40 w-12"
              data-hs-overlay="#docs-sidebar"
              aria-controls="docs-sidebar"
              aria-label="Toggle navigation"
            >
              <TbCategory fontSize={22} className="" />
              <span className="hidden text-sm md:block">All Categories</span>
            </button>
            {user ? (
              <div
                className="hs-dropdown inline-flex mr-2"
                data-hs-dropdown-placement="bottom-right"
              >
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md font-medium  align-middle  focus:outline-none focus:ring-0 transition-all text-xs"
                >
                  <div className="truncate overflow-ellipsis rounded-full gap-1 btn-gradient flex items-center justify-center text-sm px-3 py-2 md:py-1.5 focus:outline-none focus:ring-0">
                    <FaCircleUser fontSize={22} />
                    <span className="hidden md:block">Account</span>
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
                className="flex items-center gap-x-2 font-medium transition-all duration-500 px-3 py-3 md:py-1 rounded-full btn-gradient"
              >
                <FaCircleUser fontSize={22} />
                <span className="hidden md:block">Login</span>
              </button>
            )}
            {/* User buttons End */}
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
              className="flex p-2 md:p-0 mt-4 font-semibold justify-around md:flex-row md:gap-x-5 md:mt-0 md:border-0"
            >
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/car/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center  sm:py-2 nav-link"
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
                  <Link to="/self-drive/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 justify-center items-center  sm:py-2 nav-link"
                    >
                      {/* <RiStackFill fontSize={24} className="mx-auto" /> */}
                      <img
                        src="/icons/self-drive.png"
                        width={28}
                        alt=""
                        className="mx-auto"
                      />
                      Self Drive
                    </div>
                  </Link>
                  {/* <div
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
                  </div> */}
                </div>
              </li>
              <li>
                <div class="hs-dropdown relative inline-flex [--trigger:hover]">
                  <Link to="/attractions/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center  sm:py-2 nav-link"
                    >
                      {/* <MdDirectionsBus fontSize={24} className="mx-auto" /> */}
                      <img
                        src="/icons/adventurer.png"
                        width={28}
                        alt=""
                        className="mx-auto"
                      />
                      Attractions
                    </div>
                  </Link>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:left-0 after:w-full before:h-4 before:absolute before:-top-4 before:left-0 before:w-full"
                    aria-labelledby="hs-dropdown-hover-event"
                  >
                    <Link to="/bus/city-bus">
                      <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                        Dubai Delight
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
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center  sm:py-2 nav-link"
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
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center  sm:py-2 nav-link"
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
                  <Link to="/package/">
                    <div
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle text-center text-xs gap-x-1 items-center  sm:py-2 nav-link"
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
            </ul>
          </div>
        </div>
      </nav>

      <div id="google_translate_element"></div>

      {/* All Categories Sidebar */}

      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:-translate-x-0 translate-x-full transition-all duration-300 transform hidden fixed top-0 right-0 bottom-0 z-[510] md:w-[70rem] bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y"
      >
        <div className="px-6">
          <img src="/logo-1.png" alt="logo" width={120} />
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <div className="sm:grid grid-cols-1 sm:grid-cols-3 gap-6 space-y-8 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Car Rental</h1>
              <Link to="/car/?category=economy">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Economy
                </p>
              </Link>

              <Link to="/car/?category=suv">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  SUV/MUV
                </p>
              </Link>

              <Link to="/car/?category=luxury">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Luxury
                </p>
              </Link>

              <Link to="/car/?category=wedding">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Wedding Vintage
                </p>
              </Link>

              <Link to="/car/?category=tempo">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Tempo travelers and commuters
                </p>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Tourist Attractions</h1>
              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Burj Khalifa Observation Deck
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Desert Safari
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Dubai Mall and Fountain Show
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Dubai Mall and Fountain Show
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Dubai Parks and Resorts
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Dubai Aquarium and Underwater Zoo
                </p>
              </Link>

              <Link to="/attractions/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Old Dubai and Heritage Tour
                </p>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Hotels</h1>
              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Budget Hotel
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Boutique Hotel
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Luxury Hotel
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Resort
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Motel
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Bed and Breakfast
                </p>
              </Link>

              <Link to="/hotel/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Extended Stay Hotel
                </p>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Flight</h1>
              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Economy Class
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Premium Economy Class
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Business Class
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  First Class
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Domestic Flight
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  International Flight
                </p>
              </Link>

              <Link to="/flight/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Round-Trip Flight
                </p>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Holiday Packages</h1>
              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Beach Vacation Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Adventure Travel Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover.bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Honeymoon Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Cultural Tour Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Ski Vacation Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Wildlife Safari Package
                </p>
              </Link>

              <Link to="/package/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
                  Cruise Vacation Package
                </p>
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-bold px-3">Yatches and Safari</h1>
              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Yachts Luxury Package
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Yachts Adventure Package
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Marina Dhow Cruise Family Package
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Desert Safari Overnight Package
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Yachts Romantic Getaway
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Marina Dhow Cruise Sunset Package
                </p>
              </Link>

              <Link to="/yacht/">
                <p className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus-ring-2 focus-ring-blue-500">
                  Desert Safari Adrenaline Package
                </p>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* All Categories Sidebar End */}

      {/* Side Menu Sidebar */}
      <div
        id="side-menu"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[2000] w-72 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y md:hidden "
      >
        <div className="flex items-center justify-end w-[90%]">
          <button
            type="button"
            data-hs-overlay="#side-menu"
            aria-controls="side-menu"
            aria-label="Toggle navigation"
          >
            <IoClose fontSize={22} />
          </button>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-5">
            <li
              className="hs-accordion border rounded-md"
              id="account-accordion"
            >
              <button className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5  hs-accordion-active:hover:bg-transparent w-full text-slate-700 rounded-md hover:bg-gray-100">
                <span
                  dangerouslySetInnerHTML={{ __html: currencySymbol }}
                  className="text-xl font-semibold"
                ></span>
                {abbreviation}
                <svg
                  className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                id="account-accordion"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              >
                <ul className="pt-2 pl-2 divide-y divide-gray-300">
                  {Array.from(
                    new Set(
                      countryCurrencySymbols.map((entry) => entry.abbreviation)
                    )
                  )?.map((elem) => {
                    var matchingEntry = countryCurrencySymbols.find(
                      (entry) => entry.abbreviation === elem
                    );

                    return (
                      <li>
                        <button
                          onClick={() => {
                            dispatch(setCurrency(matchingEntry.abbreviation));
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}
                          className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800  w-full hover:text-theme hover:font-semibold focus:ring-0 focus:outline-none ${
                            abbreviation === matchingEntry.abbreviation
                              ? "font-semibold text-theme"
                              : ""
                          }`}
                        >
                          <span className="">{matchingEntry.abbreviation}</span>{" "}
                          {matchingEntry.currency}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li
              className="hs-accordion border rounded-md"
              id="account-accordion"
            >
              <button className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5  hs-accordion-active:hover:bg-transparent w-full text-slate-700 rounded-md hover:bg-gray-100">
                <img
                  src={countryIcon}
                  alt={defaultCountry}
                  className="rounded-full"
                  width={22}
                />
                <span className="capitalize">{selectedLanguage}</span>
                <svg
                  className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                id="account-accordion"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              >
                <ul className="pt-2 pl-2 divide-y divide-gray-300">
                  {Array.from(
                    new Set(
                      countryCurrencySymbols.map((entry) => entry.language)
                    )
                  )?.map((elem) => {
                    var matchingEntry = countryCurrencySymbols.find(
                      (entry) => entry.language === elem
                    );

                    return (
                      <li>
                        <button
                          onClick={() => {
                            changeLanguage(
                              matchingEntry.languageAbbreviation,
                              matchingEntry.language
                            );
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}
                          className={`flex items-center gap-x-3.5 py-2 px-3 rounded-md text-gray-800  w-full hover:text-theme hover:font-semibold focus:ring-0 focus:outline-none ${
                            matchingEntry.languageAbbreviation ===
                            defaultLanguage
                              ? "font-semibold text-theme"
                              : ""
                          }`}
                        >
                          <img
                            src={matchingEntry.icon}
                            alt={defaultCountry}
                            className="rounded-full"
                            width={20}
                          />
                          {matchingEntry.language}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li
              className="hs-accordion border rounded-md"
              id="projects-accordion"
            >
              <button className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5  hs-accordion-active:hover:bg-transparent w-full text-slate-700 rounded-md hover:bg-gray-100">
                <HiOutlineDocumentText fontSize={20} />
                Legal
                <svg
                  className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                id="projects-accordion"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
              >
                <ul className="pt-2 pl-2">
                  <li>
                    <Link to="/privacy-policy">
                      <button className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100">
                        Privacy Policy
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service">
                      <button className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100">
                        Terms of Service
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">
                      <button className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100">
                        Refund Policy
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/blog">
                <button className="flex items-center gap-x-3.5 py-2 px-2.5 w-full text-slate-700 rounded-md hover:bg-gray-100 ">
                  <MdOutlineArticle fontSize={20} />
                  Blog
                </button>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <button className="flex items-center gap-x-3.5 py-2 px-2.5 w-full text-slate-700 rounded-md hover:bg-gray-100 ">
                  <MdOutlineContactPage fontSize={20} />
                  Contact Us
                </button>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <button className="flex items-center gap-x-3.5 py-2 px-2.5 w-full text-slate-700 rounded-md hover:bg-gray-100 ">
                  <FcAbout fontSize={20} className="" />
                  About Us
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Side Menu Sidebar End */}
    </div>
  );
};

export default Navbar;
