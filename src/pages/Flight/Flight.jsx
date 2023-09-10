import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "@/api/api";
import Filter from "@/components/SearchComponents/FlightFilter/Filter";
import { useLocation, useSearchParams } from "react-router-dom";
import Offers from "@/components/Offers/Offers";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaPlaneDeparture } from "react-icons/fa";
const Flights = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const [message, setMessage] = useState("");
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const arrival = searchParams.get("return");
  const travellers = searchParams.get("travellers");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <main className="">
        <div className="bg-[#07162d]">
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
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
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
              <div className={`${menuOpen ? "block" : "hidden"} lg:block`}>
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
            <div className="mt-4 lg:col-span-2 lg:mt-0 xl:col-span-3">
              {/* Replace with your content */}
              <div className="border-l border-gray-200 lg:h-full">
                <div className="grid grid-cols-1 w-full px-4">
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
                          <span className="text-gray-900 font-bold">
                            12D, 12E
                          </span>
                        </p>
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
      </main>
    </div>
  );
};

export default Flights;
