import api from "@/api/api";
import BusFilter from "@/components/SearchComponents/BusFilter/BusFilter";
import { addToCart } from "@/redux/slices/CartSlice";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [busType, setBusType] = useState();
  const [wifi, setWifi] = useState();
  const [powerOutlet, setPowerOutlet] = useState();
  const [refreshments, setRefreshments] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchBuses = async () => {
    try {
      const res = await api.get(
        `/api/buses/?departure_station=${
          origin ? origin : ""
        }&arrival_station=${
          destination ? destination : ""
        }&arrival_date_before=${date ? date : ""}&bus_type=${
          busType ? busType : ""
        }&wifi_available=${wifi === null ? "" : wifi}&power_outlets_available=${
          powerOutlet === null ? "" : powerOutlet
        }&refreshments_served=${refreshments === null ? "" : refreshments}`
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
  }, [location.search, busType, wifi, powerOutlet, refreshments]);

  const [busData, setBusData] = useState();
  const fetchBusData = async () => {
    try {
      const res = await api.get(`/api/buses/`);
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setBusData(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchBusData();
  }, []);
  return (
    <div>
      <div className="">
        <BusFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Bus Type
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-4 flex-wrap">
                  {[...new Set(busData?.map(({ bus_type }) => bus_type))].map(
                    (bus_type) => (
                      <div className="flex items-center" key={bus_type}>
                        <input
                          type="radio"
                          name="bus_type"
                          defaultChecked={busType === bus_type && true}
                          onChange={() => setBusType(bus_type)}
                          value={bus_type}
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <p className="ml-3 font-medium text-gray-900">
                          {bus_type}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    WiFi Available
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setWifi(true)}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setWifi(false)}
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
                    Power Outlet
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setPowerOutlet(true)}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setPowerOutlet(false)}
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
                    Refreshment Served
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setRefreshments(true)}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setRefreshments(false)}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
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
                  <button
                    onClick={() => {
                      dispatch(
                        addToCart({
                          minDate: bus.departure_date,
                          maxDate: bus.arrival_date,
                          price: bus.price,
                          id: bus.id,
                          type: "bus",
                        })
                      );
                      navigate("/checkout");
                    }}
                    className="leading-loose btn-gradient p-1 px-2 rounded-lg uppercase text-xs tracking-wider"
                  >
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
