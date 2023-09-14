import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFlight, MdDirectionsBus, MdMoreHoriz } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
import { RiStackFill, RiRidingFill } from "react-icons/ri";
const Navigation = () => {
  const flightNavBtnRef = useRef();
  const location = useLocation();
  useEffect(() => {
    // Get the current URL
    const currentURL = location.pathname;

    if (currentURL === "/") {
      flightNavBtnRef.current.classList.add("nav-active-link");
    } else {
      flightNavBtnRef.current.classList.remove("nav-active-link");
    }

    // Get all the anchor elements in the menu
    const menuItems = document.querySelectorAll("#navigation a");

    // Loop through the anchor elements and compare href with the current URL
    menuItems.forEach((item) => {
      if (item.getAttribute("href") === currentURL) {
        item.children[0].classList.add("navigation-active-link");
      } else {
        item.children[0].classList.remove("navigation-active-link");
      }
    });
  }, [location]);
  return (
    <div className="max-w-5xl mx-auto  sm:w-[70%] md:absolute top-1 left-40">
      <section className="">
        <div className="container">
          <div
            id="navigation"
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 sm:gap-5 w-full divide-x sm:divide-x-0 sm:divide-y-0 divide-y divide-gray-200 justify-center lg:justify-between  rounded-t-lg"
          >
            <Link to="/car/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <AiOutlineCar className="w-7 h-7" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Car Rental</p>
              </div>
            </Link>
            <Link to="/flight/">
              <div
                ref={flightNavBtnRef}
                id="flight-nav-btn"
                className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white"
              >
                <div className="pt-1.5 text-sm">
                  <MdOutlineFlight className="w-7 h-7 rotate-45" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Flight</p>
              </div>
            </Link>
            <Link to="/hotel/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <RiHotelLine className="w-7 h-7" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Hotel</p>
              </div>
            </Link>
            <Link to="/bus/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <MdDirectionsBus className="w-7 h-7 " />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Bus</p>
              </div>
            </Link>
            <Link to="/package/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <TbAirBalloon className="w-7 h-7" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Packages</p>
              </div>
            </Link>
            <Link to="/dubai-activities/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <RiRidingFill className="w-7 h-7" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Activity</p>
              </div>
            </Link>
            <div>
              <div className="flex w-full gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <MdMoreHoriz className="w-7 h-7" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">More</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
