import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
import { RiStackFill } from "react-icons/ri";
const Navigation = () => {
  const location = useLocation();
  useEffect(() => {
    // Get the current URL
    const currentURL = location.pathname;

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
    <div className="max-w-5xl mx-auto  sm:w-[60%]">
      <section className="">
        <div className="container">
          <div
            id="navigation"
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 sm:gap-5 w-full divide-x sm:divide-x-0 sm:divide-y-0 divide-y divide-gray-200 justify-center lg:justify-between  rounded-t-lg"
          >
            <Link to="/car/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <AiOutlineCar className="w-7 sm:h-8 h-7 sm:w-8" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Car Rental</p>
              </div>
            </Link>
            <Link to="/flight/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <MdOutlineFlight className="w-7 sm:h-8 h-7 sm:w-8 rotate-45" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Flight</p>
              </div>
            </Link>
            <Link to="/hotel/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <RiHotelLine className="w-7 sm:h-8 h-7 sm:w-8" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Hotel</p>
              </div>
            </Link>
            <Link to="/bus/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <MdDirectionsBus className="w-7 sm:h-8 h-7 sm:w-8" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Bus</p>
              </div>
            </Link>
            <Link to="/package/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <TbAirBalloon className="w-7 sm:h-8 h-7 sm:w-8" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Packages</p>
              </div>
            </Link>
            <Link to="/forex/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  <RiStackFill className="w-7 sm:h-8 h-7 sm:w-8" />
                </div>
                <p className="pb-1.5 text-sm sm:text-lg">Forex</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
