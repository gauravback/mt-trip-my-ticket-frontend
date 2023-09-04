import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { TbAirBalloon } from "react-icons/tb";
import { RiStackFill} from "react-icons/ri";
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
    <div className="max-w-xl mx-auto w-[70%]">
      <section className="">
        <div className="container">
          <div
            id="navigation"
            className="grid grid-cols-3 md:grid-cols-6 gap-3 p-3 justify-center lg:justify-between bg-white rounded-t-lg"
          >
            <Link to="/flight/">
              <div className="flex flex-col items-center">
                <div className=" py-1.5 px-3 text-sm">
                  <MdOutlineFlight fontSize={20} />
                </div>
                <span className="">Flight</span>
              </div>
            </Link>
            <Link to="/hotel/">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm">
                  <RiHotelLine fontSize={20} />
                </div>
                <span className="">Hotel</span>
              </div>
            </Link>
            <Link to="/car/">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm">
                  <AiOutlineCar fontSize={20} />
                </div>
                <span className="">Car</span>
              </div>
            </Link>
            <Link to="/bus">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm">
                  <MdDirectionsBus fontSize={20} />
                </div>
                <span className="">Bus</span>
              </div>
            </Link>
            <Link to="/package">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm">
                  <TbAirBalloon fontSize={20} />
                </div>
                <span className="">Packages</span>
              </div>
            </Link>
            <Link to="/package">
              <div className="flex flex-col items-center">
                <div className="py-1.5 px-3 text-sm">
                  <RiStackFill fontSize={20} />
                </div>
                <span className="">Forex</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
