import api from "@/api/api";
import Offers from "@/components/Offers/Offers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineFlight, MdHiking } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import Filter from "@/components/SearchComponents/PackageFilter/PackageFilter";
import { useLocation } from "react-router-dom";
import { AiOutlineCar } from "react-icons/ai";
import { showRazorpay } from "@/components/Payment/Payment";
import { useSelector } from "react-redux";
const Package = () => {
  const [packages, setPackages] = useState();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const with_flights = searchParams.get("with_flights");
  const token = useSelector((state) => state.authReducer?.value?.token);
  const rooms = searchParams.get("rooms");
  const fetchPackags = async () => {
    const response = await api.get(
      `/api/packages/?origin_city=${origin}&destination_city=${destination}&departure=${departure}&with_flights=${with_flights}&total_rooms=${rooms}`
    );
    const result = await response.data;
    const status = await response.status;
    console.log(result);
    if (status === 200) {
      if (result.length > 0) {
        setPackages(result);
      } else {
        setMessage("No packages available");
      }
    } else {
      toast.error("Something went wrong", { id: "1" });
    }
  };
  useEffect(() => {
    if (searchParams.size > 0) {
      if (origin || destination || departure || with_flights || rooms) {
        fetchPackags();
      } else {
        setMessage("No hotels available");
      }
    }
  }, [location.search]);

  return (
    <div>
      <div>
        <div className="bg-prime">
          <Filter />
        </div>
        {/* Products */}
        <div className="mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>
              {/* Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. */}
              <button
                type="button"
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                {/* Heroicon name: mini/plus */}
                <svg
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </button>
              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  <div>
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        Color
                      </legend>
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center">
                          <input
                            id="color-0"
                            name="color[]"
                            defaultValue="white"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-0"
                            className="ml-3 text-sm text-gray-600"
                          >
                            White
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="color-1"
                            name="color[]"
                            defaultValue="beige"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-1"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Beige
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="color-2"
                            name="color[]"
                            defaultValue="blue"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-2"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Blue
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="color-3"
                            name="color[]"
                            defaultValue="brown"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-3"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Brown
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="color-4"
                            name="color[]"
                            defaultValue="green"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-4"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Green
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="color-5"
                            name="color[]"
                            defaultValue="purple"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="color-5"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Purple
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="pt-10">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        Category
                      </legend>
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center">
                          <input
                            id="category-0"
                            name="category[]"
                            defaultValue="new-arrivals"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="category-0"
                            className="ml-3 text-sm text-gray-600"
                          >
                            All New Arrivals
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="category-1"
                            name="category[]"
                            defaultValue="tees"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="category-1"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Tees
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="category-2"
                            name="category[]"
                            defaultValue="crewnecks"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="category-2"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Crewnecks
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="category-3"
                            name="category[]"
                            defaultValue="sweatshirts"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="category-3"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Sweatshirts
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="category-4"
                            name="category[]"
                            defaultValue="pants-shorts"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="category-4"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Pants &amp; Shorts
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="pt-10">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        Sizes
                      </legend>
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center">
                          <input
                            id="sizes-0"
                            name="sizes[]"
                            defaultValue="xs"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-0"
                            className="ml-3 text-sm text-gray-600"
                          >
                            XS
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sizes-1"
                            name="sizes[]"
                            defaultValue="s"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-1"
                            className="ml-3 text-sm text-gray-600"
                          >
                            S
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sizes-2"
                            name="sizes[]"
                            defaultValue="m"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-2"
                            className="ml-3 text-sm text-gray-600"
                          >
                            M
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sizes-3"
                            name="sizes[]"
                            defaultValue="l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-3"
                            className="ml-3 text-sm text-gray-600"
                          >
                            L
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sizes-4"
                            name="sizes[]"
                            defaultValue="xl"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-4"
                            className="ml-3 text-sm text-gray-600"
                          >
                            XL
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="sizes-5"
                            name="sizes[]"
                            defaultValue="2xl"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="sizes-5"
                            className="ml-3 text-sm text-gray-600"
                          >
                            2XL
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </aside>
            {/* Product grid */}
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              {/* Replace with your content */}
              <div className="h-96 rounded-lg border-l border-gray-200 lg:h-full border">
                <div className="grid grid-cols-1 w-full px-4">
                  {/* Card */}
                  <div className="flex w-full max-w-xs mx-auto md:mx-0 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <div className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                      <img
                        className="object-cover"
                        src="/1.jpg"
                        alt="pkg.name"
                      />
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
                  {/* Card End */}
                </div>
              </div>
              {/* /End replace */}
            </div>
          </div>
          <Offers />
        </div>
      </div>
    </div>
  );
};

export default Package;
