import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
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
        item.children[0].children[0].classList.add(
          "navigation-active-link-icon"
        );
        item.children[0].classList.add("navigation-active-link");
      } else {
        item.children[0].classList.remove("navigation-active-link-icon");
        item.children[0].classList.remove("navigation-active-link");
      }
    });
  }, [location]);
  return (
    <div className="max-w-xl mx-auto w-[90%]">
      <section className="">
        <div className="container">
          <div
            id="navigation"
            className="grid grid-cols-3 md:grid-cols-auto gap-6 p-3 justify-center lg:justify-between bg-white rounded-t-lg"
          >
            <Link to="/flight/">
              <div className="flex flex-col items-center">
                <div className=" py-1.5 px-3 text-sm md:text-base">
                  <MdOutlineFlight fontSize={24} />
                </div>
                <span className="">Flight</span>
              </div>
            </Link>
            <Link to="/hotel/">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm md:text-base">
                  <RiHotelLine fontSize={24} />
                </div>
                <span className="">Hotel</span>
              </div>
            </Link>
            <Link to="/car/">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm md:text-base">
                  <AiOutlineCar fontSize={24} />
                </div>
                <span className="">Car</span>
              </div>
            </Link>
            {/* <Link to="/bus">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm md:text-base">
                  <MdDirectionsBus fontSize={24} />
                </div>
                <span className="">Bus</span>
              </div>
            </Link>
            <Link to="/package">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm md:text-base">
                  <TbAirBalloon fontSize={24} />
                </div>
                <span className="">Packages</span>
              </div>
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
