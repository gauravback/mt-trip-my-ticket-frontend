import api from "@/api/api";
import BusFilter from "@/components/SearchComponents/BusFilter/BusFilter";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Bus = () => {
  const [buses, setBuses] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const fetchBuses = async () => {
    try {
      const res = await api.get(
        `/api/buses/?departure_station=${origin}&arrival_station=${destination}&arrival_date_before=${date}`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setBuses(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchBuses();
  }, [location.search]);
  return (
    <div>
      <div className="bg-prime">
        <BusFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
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
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

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
        <div className="md:w-2/3 p-3 w-full">
          <div className="grid grid-cols-1 lg:gap-y-4 gap-6">
            {/* Card */}
            {buses?.map((bus) => (
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="px-4 pb-3 pt-4 border-b border-gray-300 bg-gray-100 flex justify-between">
                  <div className="text-lg uppercase font-bold text-gray-900 tracking-wide flex items-center gap-x-2">
                    <FaBus fontSize={28} />
                    {bus.bus_number}
                  </div>
                  <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">
                    {bus.departure_station}{" "}
                    <span className="tracking-normal">--&gt;</span>{" "}
                    {bus.arrival_station}
                  </p>
                </div>
                <div className="p-4 text-gray-700 flex justify-between items-start">
                  <div>
                    <p className="text-2xl text-gray-900 capitalize leading-none my-1">
                      {bus.operator}
                    </p>
                    <p className="text-sm w-56">
                      {format(new Date(bus.departure_date), "dd MMM")} --&gt;
                      {format(new Date(bus.arrival_date), "dd MMM")}
                    </p>
                  </div>
                  <button className="leading-loose btn-gradient p-1 px-2 rounded-lg uppercase text-xs tracking-wider">
                    Book Now
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
                  <div className="flex items-center">
                    <p>
                      <span className="pr-1">Wifi:</span>{" "}
                      <span className="text-gray-900 font-bold">
                        {bus.wifi_available ? "Available" : "Not Available"}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="inline-flex text-lg items-center">
                      <span className="pr-1">Price:</span>{" "}
                      <p className="text-gray-900 font-bold">
                        <span
                          dangerouslySetInnerHTML={{ __html: currencySymbol }}
                        ></span>
                        {parseFloat(bus.price * priceRate).toFixed(2)}
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

export default Bus;
