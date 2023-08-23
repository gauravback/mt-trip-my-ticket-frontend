import React, { useEffect, useState } from "react";
import { HomePageComponent } from "../../components/homePageComponent";
import { HomePageComponent2 } from "../../components/homePageComponent2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Car() {
  const [whatToShow, setWhatToshow] = useState("flight");
  const handleFlight = () => {
    setWhatToshow("flight");
  };
  const handleHotel = () => {
    setWhatToshow("hotel");
  };

  $(document).on("click", ".iconCard", function () {
    $(".secondHeader > .iconCard").removeClass("active");
    $(this).addClass("active");
  });
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const [cars, setCars] = useState();
  const fetchCars = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cars/`);
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setCars(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
  console.log(cars);
  return (
    <>
      <div className="homeTop1">
        <div className="homeTopCard">
          <div className="secondHeader">
            <Link to="/flight" className="iconCard" onClick={handleFlight}>
              <i className="fa fa-plane"></i>
              <h1>Flight</h1>
            </Link>
            <Link to="/hotel" className="iconCard" onClick={handleHotel}>
              <i className="fa fa-hotel"></i>
              <h1>Hotel</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-home"></i>
              <h1>Home Style</h1>
            </Link>
            {/* <Link to="" className="iconCard">
                <i className="fa fa-balloon"></i>
                <i className="fa fa-car"></i>
                <h1>Holiday Packages</h1>
              </Link> */}
            <Link to="" className="iconCard">
              <i className="fa fa-train"></i>
              <h1>Train</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-bus"></i>
              <h1>Bus</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-car"></i>
              <h1>Car</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-money"></i>
              <h1>Forex</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-plane"></i>
              <h1>Charter Plane</h1>
            </Link>
          </div>
          {/*  */}
          {whatToShow == "flight" ? (
            <HomePageComponent />
          ) : (
            <HomePageComponent2 />
          )}

          {/*  */}
          <div className="homeSearchButtonBx">
            <button>Search</button>
          </div>
        </div>

        {/*  */}
        <div className="homeExplore">
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png"
              alt=""
            />
            <p>Where2Go</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png"
              alt=""
            />
            <p>TripMoney</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png"
              alt=""
            />
            <p>Explore Enternational Flights</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png"
              alt=""
            />
            <p>MICE</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png"
              alt=""
            />
            <p>Gift Cards</p>
          </div>
        </div>
      </div>

      <div className="container mt-5 mx-auto pb-12">
        <div className="weg1">
          <h1>Top Experiences in Abu Dhabi</h1>
          <p>
            Discover the best attractions and activities that the UAE's capital
            city has to offer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-3">
          {cars.map((car) => (
            <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 border">
              <img
                alt={car.model}
                src={car.images}
                className="h-56 w-full rounded-md object-contain"
              />
              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Price</dt>
                    <dd className=" text-gray-800 font-semibold">
                      Rent : &#8377; {car.price}/ Day
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="font-bold text-lg">
                      {car.make} {car.model}
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="">Passengers : {car.passengers}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
