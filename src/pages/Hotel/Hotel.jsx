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
      <Filter />
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
                {hotels?.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="mx-2 w-full  max-w-screen-xl rounded-md border border-gray-100 text-gray-700  md:mx-auto"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="p-5 md:w-4/6 md:p-8">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs uppercase text-blue-900">
                          {hotel.city}
                        </span>
                        <p className="mt-2 text-lg font-black md:mt-4 md:text-xl flex items-center gap-x-2">
                          {hotel.name} (
                          <span className="flex items-center font-medium">
                            {hotel.star_category} Star
                            <MdStar className="text-yellow-500" />
                          </span>
                          )
                        </p>
                        <div class="flex flex-col md:flex-row md:items-end">
                          <p class="mt-3 text-2xl font-black">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: currencySymbol || "",
                              }}
                            />
                            {Math.trunc(hotel.price)}
                          </p>
                        </div>
                        <p className="mt-3 text-gray-600">
                          Rooms Available: {hotel.available_rooms}
                        </p>
                        <Link to={`/hotel/${hotel.id}`}>
                          <button className="mt-4 mr-2 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:-translate-y-1 hover:bg-sky-500">
                            View Details
                          </button>
                        </Link>
                      </div>
                      <div className="mx-auto hidden items-center px-5 md:flex md:p-8">
                        <img
                          className="rounded-md shadow-lg object-cover"
                          src={hotel.image}
                          alt={hotel.name}
                          width={300}
                        />
                      </div>
                    </div>
                  </div>
                ))}

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
