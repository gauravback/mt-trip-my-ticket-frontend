import api from "@/api/api";
import Filter from "@/components/SearchComponents/HotelFilter/Filter";
import Offers from "@/components/Offers/Offers";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { useSelector } from "react-redux";

const Hotels = () => {
  const [hotels, setHotels] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const city = searchParams.get("city");
  const rooms = searchParams.get("rooms");
  const minPrice = searchParams.get("min-price");
  const maxPrice = searchParams.get("max-price");
  const checkIn = searchParams.get("checkin");
  const checkOut = searchParams.get("checkout");
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const fetchHotels = async () => {
    const response = await api.get(
      // `/api/hotels/?city=${city}&available_rooms_min=${
      //   rooms ? rooms : ""
      // }&price_min=${minPrice ? minPrice : ""}&price_max=${
      //   maxPrice ? maxPrice : ""
      // }&available_from=${checkIn}&available_to=${checkOut}`
      `/api/hotels/`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      if (result.length > 0) {
        setHotels(result);
      } else {
        setMessage("No hotels available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    // if (searchParams.size > 0) {
    //   if (city || rooms || minPrice || maxPrice || checkIn || checkOut) {
    //     fetchHotels();
    //   } else {
    //     setMessage("No hotels available");
    //   }
    // }
    fetchHotels();
  }, [location.search]);
  console.log(hotels);
  return (
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
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
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
          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            {/* Replace with your content */}
            <div className="border-l border-gray-200 lg:h-full">
              <div className="grid grid-cols-1 w-full px-4 gap-4">
                {/* Card */}

                <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-4xl mx-auto border  bg-white">
                  <div className="w-full md:w-1/5 bg-white grid place-items-center">
                    <img
                      src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="tailwind logo"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="w-full md:w-4/5 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                      <p className="text-gray-500 text-sm font-medium hidden md:block">
                        Vacations
                      </p>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-gray-600 font-bold text-xs ml-1">
                          4.96
                        </p>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-xl text-base">
                      The Majestic and Wonderful Bahamas
                    </h3>
                    <p className="md:text-base text-gray-500 text-sm">
                      The best kept secret of The Bahamas is the country’s sheer
                      size and diversity. With 16 major islands, The Bahamas is
                      an unmatched destination
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-black text-gray-800">
                        $110
                        <span className="font-normal text-gray-600 text-sm">
                          /night
                        </span>
                      </p>
                      <button
                        className="btn-gradient px-2.5 py-1 rounded-md"
                        type="button"
                      >
                        View Deails
                      </button>
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
  );
};

export default Hotels;
