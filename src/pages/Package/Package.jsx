import api from "@/api/api";
import PackageFilter from "@/components/SearchComponents/PackageFilter/PackageFilter";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaHotelSolid } from "react-icons/lia";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiBus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
        `/api/packages/?origin_city=${origin ? origin : ""}&destination_city=${
          destination ? destination : ""
        }&activities=&departure_after=${
          departure ? departure : ""
        }&departure_before=&star_category=&price_min=&price_max=&with_flights=${
          withFlights ? withFlights : ""
        }&total_rooms_min=${rooms ? rooms : ""}&total_rooms_max=`
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
  return (
    <div>
      <div className="">
        <PackageFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="p-3 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-y-4 gap-6">
            {/* Card */}
            {packages?.map((pkg) => (
              <div className="relative mx-auto w-full border border-gray-300 rounded-md">
                <div className="relative inline-block duration-300 ease-in-out transition-transform transform  w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src={pkg.image}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        {pkg.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          {(pkg.activities.match(/\n/g) || []).length + 1}{" "}
                          Activites
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          {pkg.flights.length} Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          {pkg.hotels.length} Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          {pkg.buses.length + pkg.cars.length} Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            {parseFloat(pkg.price * priceRate).toFixed(2)}
                          </span>
                        </p>
                        <Link to={`/package/${pkg.id}`}>
                          <button className="inline-block font-semibold  p-2 whitespace-nowrap text-gradient leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
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
