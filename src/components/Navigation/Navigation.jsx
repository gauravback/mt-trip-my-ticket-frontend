import React, { useEffect, useRef } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { MdDirectionsBus, MdMoreHoriz, MdOutlineFlight } from "react-icons/md";
import { RiHotelLine, RiRidingFill, RiStackFill } from "react-icons/ri";
import { TbAirBalloon } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
const Navigation = () => {
  const flightNavBtnRef = useRef();
  const location = useLocation();
  useEffect(() => {
    // Get the current URL
    // const currentURL = location.pathname;
    // if (currentURL === "/") {
    //   flightNavBtnRef.current.classList.add("nav-active-link");
    // } else {
    //   flightNavBtnRef.current.classList.remove("nav-active-link");
    // }
    // // Get all the anchor elements in the menu
    // const menuItems = document.querySelectorAll("#navigation a");
    // // Loop through the anchor elements and compare href with the current URL
    // menuItems.forEach((item) => {
    //   if (item.getAttribute("href") === currentURL) {
    //     item.children[0].classList.add("navigation-active-link");
    //   } else {
    //     item.children[0].classList.remove("navigation-active-link");
    //   }
    // });
  }, [location]);
  return (
    <div className="md:max-w-[90%] w-full mx-auto  md:absolute top-1 left-12">
      <section className="">
        <div className="container">
          <div
            id="navigation"
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-8 gap-0 sm:gap-2 w-full divide-x-0 divide-y-0 divide-gray-200 justify-center lg:justify-between  rounded-t-lg md:max-w-[85%] mx-auto"
          >
            <Link to="/car/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <AiOutlineCar className="w-7 h-7" /> */}
                  <img src="/icons/car.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Car Rental</p>
              </div>
            </Link>
            <Link to="/self-drive/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <AiOutlineCar className="w-7 h-7" /> */}
                  <img src="/icons/self-drive.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Self Drive</p>
              </div>
            </Link>
            <Link to="/attractions/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <RiRidingFill className="w-7 h-7" /> */}
                  <img src="/icons/adventurer.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Attractions</p>
              </div>
            </Link>
            <Link to="/flight/">
              <div
                ref={flightNavBtnRef}
                id="flight-nav-btn"
                className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white"
              >
                <div className="pt-1.5 text-sm">
                  {/* <MdOutlineFlight className="w-7 h-7 rotate-45" /> */}
                  <img src="/icons/plane.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Flight</p>
              </div>
            </Link>
            <Link to="/hotel/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <RiHotelLine className="w-7 h-7" /> */}
                  <img src="/icons/hotel.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Hotel</p>
              </div>
            </Link>
            <Link to="/yacht/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <MdDirectionsBus className="w-7 h-7 " /> */}
                  <img src="/icons/yacht.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Yacht</p>
              </div>
            </Link>
            <Link to="/visa/">
              <div className="flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <MdDirectionsBus className="w-7 h-7 " /> */}
                  <img src="/icons/visa.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Visa</p>
              </div>
            </Link>
            <div class="hidden hs-dropdown relative md:inline-flex">
              <div
                id="hs-dropdown-default"
                className="hs-dropdown-toggle flex w-full gap-y-0 flex-col sm:shadow-lg text-gray-600 h-16 items-center sm:rounded   transition-all duration-500 bg-white"
              >
                <div className="pt-1.5 text-sm">
                  {/* <MdMoreHoriz className="w-7 h-7" /> */}
                  <img src="/icons/menu.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">More</p>
              </div>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms]  hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10  min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown-default"
              >
                <Link to="/package/">
                  <div className="flex gap-y-0 my-1.5 p-2  text-gray-600 items-center sm:rounded h-16 hover:bg-gray-100 transition-all duration-500 bg-white">
                    <div className="text-sm">
                      {/* <TbAirBalloon className="w-7 h-7" /> */}
                      <img src="/icons/luggage.png" width={28} alt="" />
                    </div>
                    <p className="pb-1.5 text- font-semibold">Packages</p>
                  </div>
                </Link>
                <Link to="/forex/">
                  <div className="flex gap-y-0 my-1.5 p-2  text-gray-600 items-center sm:rounded h-16 hover:bg-gray-100 transition-all duration-500 bg-white">
                    <div className="text-sm">
                      {/* <TbAirBalloon className="w-7 h-7" /> */}
                      <img src="/icons/forex.png" width={28} alt="" />
                    </div>
                    <p className="pb-1.5 text- font-semibold">Forex</p>
                  </div>
                </Link>
              </div>
            </div>
            <Link to="/package/">
              <div className="md:hidden flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <MdDirectionsBus className="w-7 h-7 " /> */}
                  <img src="/icons/luggage.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Packages</p>
              </div>
            </Link>
            <Link to="/forex/">
              <div className="md:hidden flex gap-y-0 flex-col text-gray-600 items-center sm:rounded h-16 sm:shadow-lg hover:shadow-2xl hover:shadow-gray-500 md:hover:scale-105 transition-all duration-500 bg-white">
                <div className="pt-1.5 text-sm">
                  {/* <MdDirectionsBus className="w-7 h-7 " /> */}
                  <img src="/icons/forex.png" width={24} alt="" />
                </div>
                <p className="pb-1.5 text-sm font-semibold">Forex</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
