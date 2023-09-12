import api from "@/api/api";
import Filter from "@/components/SearchComponents/FlightFilter/Filter";
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
  console.log(origin, destination, departure, returnDate, adults, children);

  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchFlights = async () => {
    try {
      const res = await api.get(
        `/api/flights/?departure_airport_city=${origin}&arrival_airport_city=${destination}&departure_time_after=${departure}&departure_time_before=&arrival_time_after=&arrival_time_before=${
          returnDate ? returnDate : ""
        }&available_seats_min=${adults ? adults : 0 + children ? children : 0}`
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
  return (
    <div>
      <div className="bg-prime">
        <Filter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/4">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-8 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              {/* Material Section */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <img
                    className="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4.svg"
                    alt="materials"
                  />
                  <img
                    className="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4dark.svg"
                    alt="materials"
                  />
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Material
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-8 flex-wrap">
                  <div className="flex items-center gap-x-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      id="Leather"
                      name="Leather"
                      defaultValue="Leather"
                    />
                    <div className="inline-block">
                      <div className="flex ">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          Leather
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200  w-full md:my-10 my-8" />

              {/* Apply Filter Button (Large Screen) */}
              <div className="hidden w-full md:block mt-7">
                <button className=" w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4 ">
                  Apply Filter
                </button>
              </div>
              {/* Apply Filter Button (Table or lower Screen) */}
              <div className="block md:hidden w-full mt-10">
                <button
                  onclick="applyFilters()"
                  className="w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 p-3 w-full">
          <div className="grid grid-cols-1 lg:gap-y-4 gap-6">
            {/* Card */}
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="px-4 pb-3 pt-4 border-b border-gray-300 bg-gray-100 flex justify-between">
                <div className="text-lg uppercase font-bold text-gray-900 tracking-wide flex items-center gap-x-2">
                  <FaPlaneDeparture fontSize={28} />
                  Flight Name
                </div>
                <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">
                  DFW <span className="tracking-normal">--&gt;</span> SEA
                </p>
              </div>
              <div className="p-4 text-gray-700 flex justify-between items-start">
                <div>
                  <p className="text-2xl text-gray-900 leading-none my-1">
                    AA 792
                  </p>
                  <p className="text-xs w-56">American Airlines</p>
                  <p className="text-sm w-56">7:11 am --&gt; 10:10 am</p>
                </div>
                <button className="leading-loose btn-gradient p-1 px-2 rounded-lg uppercase text-xs tracking-wider">
                  Book Now
                </button>
              </div>
              <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
                <div className="flex items-center">
                  <p>
                    <span className="text-sm pr-1">Terminal</span>{" "}
                    <span className="text-gray-900 font-bold">C</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p>
                    <span className="text-sm pr-1">Gate</span>{" "}
                    <span className="text-gray-900 font-bold">C24</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p>
                    <span className="text-sm pr-1">Seats</span>{" "}
                    <span className="text-gray-900 font-bold">12D, 12E</span>
                  </p>
                </div>
              </div>
            </div>
            {/* End Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
