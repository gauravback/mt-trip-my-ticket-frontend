import api from "@/api/api";
import PackageFilter from "@/components/SearchComponents/PackageFilter/PackageFilter";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCar } from "react-icons/ai";
import { MdHiking, MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Package = () => {
  const [cars, setCars] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchCars = async () => {
    try {
      const res = await api.get("/api/cars/");
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setCars(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div>
      <div className="bg-prime">
        <PackageFilter />
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
            <div className="flex w-full max-w-xs mx-auto md:mx-0 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <div className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img className="object-cover" src="/1.jpg" alt="pkg.name" />
              </div>
              <div className="mt-4 px-5 pb-3">
                <h5 className="text-lg tracking-tight font-semibold text-slate-900">
                  pkg.name
                </h5>
                <div className="space-y-4 mt-2">
                  <p>
                    <span className="text-sm inline-flex items-center gap-x-2 font-medium px-2 rounded py-0.5 bg-amber-100 text-slate-900">
                      {/* {pkg?.origin_city?.split(",")[0]} <BsArrowRight />
                          {pkg?.destination_city.split(",")[0]} */}
                      Origin --&gt; Destination
                    </span>
                  </p>
                  <div className="mt-5 flex justify-between">
                    <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                      <MdOutlineFlight />
                      <span className="text-xs font-normal">Flights</span>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                      <RiHotelLine />
                      <span className="text-xs font-normal">Hotels</span>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                      <MdHiking />
                      <span className="text-xs font-normal">
                        {/* {(pkg.activities.match(/\n/g) || []).length + 1}{" "} */}
                        {""}
                        activites
                      </span>
                    </div>
                    <div className="flex flex-col cursor-pointer items-center justify-center rounded-md  text-xl font-bold">
                      <AiOutlineCar />
                      <span className="text-xs font-normal">
                        pkg.cars.length
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
                    pkg.price
                    <p className="text-sm font-normal">per person</p>
                  </div>
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

export default Package;
