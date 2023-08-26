import { NavLink } from "react-router-dom";
import "./Navigation.scss";

import {
  // FaAngleDown,
  // FaAngleRight,
  FaTrain,
  // FaBars,
  // FaTimes,
} from "react-icons/fa";
import { MdOutlineFlight, MdDirectionsBus } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";

const Navigation = () => {
  return (
    <section className="navigation-wrapper">
      <div className="navigation">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to={"/flight"}
        >
          <MdOutlineFlight className="icon" />
          <span>Flights</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to={"/hotel"}
        >
          <RiHotelLine className="icon" />
          <span>Hotels</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to={"/"}
        >
          <RiHotelLine className="icon" />
          <span>Travel Packages</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to={"/"}
        >
          <MdDirectionsBus className="icon" />
          <span>Buses</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to={"/car"}
        >
          <AiOutlineCar className="icon" />
          <span>Cabs</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Navigation;
