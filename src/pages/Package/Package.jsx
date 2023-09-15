import api from "@/api/api";
import PackageFilter from "@/components/SearchComponents/PackageFilter/PackageFilter";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCar } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { MdHiking, MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Package = () => {
  const [packages, setPackages] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const rooms = searchParams.get("rooms");
  const withFlights = searchParams.get("withFlights");
  const fetchPackages = async () => {
    try {
      const res = await api.get(
        `/api/packages/?origin_city=${origin}&destination_city=${destination}&activities=&departure_after=${departure}&departure_before=&star_category=&price_min=&price_max=&with_flights=${withFlights}&total_rooms_min=${rooms}&total_rooms_max=`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setPackages(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchPackages();
  }, [location.search]);
  console.log(packages);
  return (
    <div>
      <div className="">
        <PackageFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="p-3 w-full">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-y-4 gap-6">
            {/* Card */}
            {packages?.map((pkg) => (
              <div
                key={pkg.id}
                className="flex w-full max-w-xs mx-auto md:mx-0 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <div className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                  <img
                    className="object-cover"
                    src={pkg.image}
                    alt={pkg.name}
                  />
                </div>
                <div className="mt-4 px-5 pb-3">
                  <h5 className="text-lg tracking-tight font-semibold text-slate-900">
                    {pkg.name}
                  </h5>
                  <div className="space-y-4 mt-2">
                    <p>
                      <span className="text-sm inline-flex items-center gap-x-2 font-medium px-2 rounded py-0.5 bg-amber-100 text-slate-900">
                        {pkg?.origin_city?.split(",")[0]} <BsArrowRight />
                        {pkg?.destination_city.split(",")[0]}
                      </span>
                    </p>
                    <div className="mt-5 flex justify-between">
                      <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                        <MdOutlineFlight />
                        <span className="text-xs font-normal">
                          {pkg.flights.length} Flights
                        </span>
                      </div>
                      <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                        <RiHotelLine />
                        <span className="text-xs font-normal">
                          {pkg.hotels.length} Hotels
                        </span>
                      </div>
                      <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                        <MdHiking />
                        <span className="text-xs font-normal">
                          {(pkg.activities.match(/\n/g) || []).length + 1} {""}
                          activites
                        </span>
                      </div>
                      <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                        <AiOutlineCar />
                        <span className="text-xs font-normal">
                          {pkg.buses.length + pkg.cars.length} Transfers
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md mt-2 pt-1 text-center text-sm font-medium text-gray-950 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <div className="">
                      <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                    <div className="font-semibold ml-1 text-xl">
                      &#8377;{Math.trunc(pkg.price)}
                      <p className="text-sm font-normal">per person</p>
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

export default Package;
