import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { RiHotelBedLine } from "react-icons/ri";
const Navbar = () => {
  const user = useSelector((state) => state.authReducer?.value);

  const dispatch = useDispatch();

  return (
    <div>
      <nav className="bg-white w-full">
        <div className="max-w-[85rem] flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="logo" width={120} />
            </Link>
          </div>
          <div className="flex md:order-2">
            {user ? (
              <div
                className="hs-dropdown inline-flex"
                data-hs-dropdown-placement="bottom-right"
              >
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs"
                >
                  {/* <img
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  /> */}
                  <div className="h-[2.375rem] w-[2.375rem] rounded-full bg-gray-900 text-white flex items-center justify-center text-lg">
                    {user?.email.slice(0, 1).toUpperCase()}
                  </div>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-white shadow-md rounded-lg p-2"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800">
                      {user?.email}
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <button
                      onClick={() => {
                        dispatch(logout());
                      }}
                      className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md  text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                      <HiOutlineLogout fontSize={24} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-x-2 font-medium text-red-600 transition-all duration-500 px-3 py-1 rounded-full hover:text-red-700">
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
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
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
            <ul className="flex flex-col p-2 md:p-0 mt-4 font-semibold border border-gray-100 rounded-lg md:flex-row md:space-x-10 md:mt-0 md:border-0">
              <li>
                <Link to="/flight">
                  <p className="flex text-lg gap-x-1 items-center text-gray-700 hover:text-red-600 sm:py-2">
                    <MdOutlineFlight fontSize={24} />
                    Flight
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/hotel">
                  <p className="flex text-lg gap-x-1 items-center text-gray-700 hover:text-red-600 sm:py-2">
                    <RiHotelLine fontSize={24} />
                    Hotel
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/car">
                  <p className="flex text-lg gap-x-1 items-center text-gray-700 hover:text-red-600 sm:py-2">
                    <AiOutlineCar fontSize={24} />
                    Car
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/bus">
                  <p className="flex text-lg gap-x-1 items-center text-gray-700 hover:text-red-600 sm:py-2">
                    <MdDirectionsBus fontSize={24} />
                    Bus
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/package">
                  <p className="flex text-lg gap-x-1 items-center text-gray-700 hover:text-red-600 sm:py-2">
                    <RiHotelLine fontSize={24} />
                    Travel Package
                  </p>
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
