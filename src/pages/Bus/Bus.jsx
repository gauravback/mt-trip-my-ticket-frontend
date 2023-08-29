import api from "@/api/api";
import Filter from "@/components/BusFilter/BusFilter";
import Offers from "@/components/Offers/Offers";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdHiking, MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const Bus = () => {
  const [buses, setBuses] = useState();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");

  const fetchBuses = async () => {
    const response = await api.get(
      `/api/buses/?departure_city=${origin}&arrival_city=${destination}&departure_time=${departure}`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      console.log(result);
      if (result.length > 0) {
        setBuses(result);
      } else {
        setMessage("No buses available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      if (origin || destination || departure) {
        fetchBuses();
      } else {
        setMessage("No buses available");
      }
    }
  }, [location.search]);
  console.log(buses);
  return (
    <div>
      <div>
        <Filter />
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          {buses ? (
            <div className="mt-6 grid  grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-10">
              {buses?.map((bus) => (
                <div className="mx-auto md:mx-0 my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-full md:flex-row md:items-start md:text-left bg-white">
                  <div className="mb-4 md:mr-6 md:mb-0">
                    <img
                      className="h-24 rounded-lg object-cover md:w-24"
                      src="/bus.png"
                      alt
                    />
                  </div>
                  <div className=" flex w-full justify-between items-center">
                    <div>
                      <p className="text-xl font-medium text-gray-700">
                        {bus.operator}
                      </p>
                      <p className="mb-4 text-sm font-medium text-gray-500">
                        {bus.bus_type}
                      </p>
                      <div className="flex items-center gap-x-4 my-4">
                        <span class="inline-flex items-center text-sm gap-1.5 py-1.5 px-3 rounded-full font-medium bg-blue-100 text-blue-800">
                          {bus.departure_city}
                        </span>
                        <BsArrowRight />
                        <span class="inline-flex items-center text-sm gap-1.5 py-1.5 px-3 rounded-full font-medium bg-blue-100 text-blue-800">
                          {bus.arrival_city}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                        <p className="text-xl font-medium text-gray-600">
                          {format(new Date(bus.departure_time), "dd MMM")}
                        </p>
                      </div>
                      <p>---{bus.duration} Hours---</p>
                      <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                        <p className="text-xl font-medium text-gray-600">
                          {format(new Date(bus.arrival_time), "dd MMM")}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3" />
                    <div className="flex space-x-5 items-center">
                      <div className="font-semibold ml-1 text-xl">
                        &#8377;{Math.trunc(bus.price)}
                      </div>
                      <button className="w-full rounded-lg border-2 border-transparent  px-4 py-2 font-medium btn-gradient">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center my-12">
              <h1 className="text-2xl font-semibold">
                {message ? message : ""}
              </h1>
            </div>
          )}
          <Offers />
        </div>
      </div>
    </div>
  );
};

export default Bus;
