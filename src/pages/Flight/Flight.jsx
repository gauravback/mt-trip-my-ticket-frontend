import api from "@/api/api";
import Filter from "@/components/SearchComponents/FlightFilter/Filter";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlaneDeparture } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Flight = () => {
  const [flights, setFlights] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");

  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchFlights = async () => {
    try {
      const res = await api.get(
        `/api/flights/?departure_airport_city=${origin}&arrival_airport_city=${destination}&departure_time_after=&departure_time_before=${departure}&arrival_time_after=${
          returnDate ? returnDate : ""
        }&arrival_time_before=&available_seats_min=${
          adults ? adults : 0 + children ? children : 0
        }`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setFlights(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    if (
      (searchParams.size > 0 && origin && destination && departure) ||
      adults ||
      children ||
      returnDate
    ) {
      fetchFlights();
    }
  }, [location.search]);
  const [flightData, setFlightData] = useState();
  const fetchFlightData = async () => {
    try {
      const res = await api.get(`/api/flights/`);
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setFlightData(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchFlightData();
  }, []);

  const [cabinClass, setCabinClass] = useState("");
  const [wifiAvailable, setWifiAvailable] = useState();
  const [inFlightMeal, setInFlightMeal] = useState();
  return (
    <div>
      <div className="">
        <Filter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/4">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-8 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Cabin Class
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-5 flex-wrap">
                  {[
                    ...new Set(
                      flightData?.map(({ cabin_class }) => cabin_class)
                    ),
                  ].map((cabin_class) => (
                    <div className="flex items-center" key={cabin_class}>
                      <input
                        type="radio"
                        name="cabin_class"
                        defaultChecked={cabinClass === cabin_class && true}
                        value={cabin_class}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <p className="ml-3 font-medium text-gray-900">
                        {cabin_class}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="bg-gray-200  w-full md:my-10 my-8" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    WiFi Available
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      onClick={() => {
                        setWifiAvailable(true);
                      }}
                      type="text"
                      value={true}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setWifiAvailable(false);
                      }}
                      value={false}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200  w-full md:my-10 my-8" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    In Flight Meal
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      onClick={() => {
                        inFlightMeal(true);
                      }}
                      type="text"
                      value={true}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={() => {
                        inFlightMeal(false);
                      }}
                      type="text"
                      value={false}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {/* Apply Filter Button (Large Screen) */}
              <div className="hidden w-full md:block mt-7">
                <button className=" w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4 ">
                  Apply
                </button>
              </div>
              {/* Apply Filter Button (Table or lower Screen) */}
              <div className="block md:hidden w-full mt-10">
                <button className="w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 p-3 w-full">
          <div className="grid grid-cols-1 lg:gap-y-4 gap-6">
            {/* Card */}
            {flights?.map((flight) => (
              <div
                key={flight.id}
                className="bg-white border rounded-lg overflow-hidden"
              >
                <div className="px-4 pb-3 pt-4 border-b border-gray-300 bg-gray-100 flex justify-between">
                  <div className="text-lg uppercase font-bold text-gray-900 tracking-wide flex items-center gap-x-2">
                    <FaPlaneDeparture fontSize={28} />
                    {flight.name}
                  </div>
                  <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">
                    {flight.departure_airport.code}
                    <span className="tracking-normal">--&gt;</span>{" "}
                    {flight.arrival_airport.code}
                  </p>
                </div>
                <div className="p-4 text-gray-700 flex justify-between items-start">
                  <div>
                    <p className="text-2xl text-gray-900 leading-none my-1">
                      {flight.flight_number}
                    </p>
                    <p className="text-xs w-56">{flight.airline.name} </p>
                    <p className="text-sm w-56">
                      {format(new Date(flight.departure_time), "dd MMM")} --&gt;{" "}
                      {format(new Date(flight.arrival_time), "dd MMM")}
                    </p>
                  </div>
                  <button className="leading-loose btn-gradient p-1 px-2 rounded-lg uppercase text-xs tracking-wider">
                    Book Now
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <p>
                        <span className="text-sm pr-1">From</span>
                        <span className="text-gray-900 font-bold">
                          {flight.departure_airport.city}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p>
                        <span className="text-sm pr-1">To</span>
                        <span className="text-gray-900 font-bold">
                          {flight.arrival_airport.city}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <span className="text-sm pr-1">Price</span>
                      <p className="text-gray-900 text-lg font-bold inline-flex items-center">
                        <span
                          dangerouslySetInnerHTML={{ __html: currencySymbol }}
                        ></span>
                        {parseFloat(flight.price * priceRate).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
