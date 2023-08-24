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
      <div className="container mt-5 mx-auto pb-12">
        <div className="weg1">
          <h1>Cars</h1>
        </div>
        {cars && (
          <div className="grid grid-cols-1 mx-auto gap-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
              >
                <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-6">
                    <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-48 sm:w-3/5">
                      <img
                        src={car.images}
                        alt="Insulated bottle with white base and black snap lid."
                        className="h-full w-full object-contain object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      <p className="mt-2 text-2xl font-medium text-gray-900">
                        &#8377; {Math.trunc(car.price)}
                      </p>
                      <div className="mt-3 text-gray-700">
                        <p className="font-semibold text-lg">
                          Passengers: {car.passengers}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:col-span-6 lg:mt-0">
                    <div className="grid grid-cols-1 gap-x-6 text-sm space-y-6">
                      <div>
                        <div className="font-semibold text-xl  text-gray-900">
                          Transmission: {car.transmission}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-xl  text-gray-900">
                          AC Avalable: {car.ac ? "Yes" : "No"}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-xl  text-gray-900">
                          Air Bags: {car.bags ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center mt-6">
                      <button className="py-2 px-5 rounded-md bg-red-600 text-white">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
