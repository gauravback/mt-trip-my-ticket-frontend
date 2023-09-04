import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/api";
import Filter from "@/components/SearchComponents/CarFilter/CarFilter";
import { useLocation } from "react-router-dom";
import Offers from "@/components/Offers/Offers";

export default function Car() {
  const [cars, setCars] = useState();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  console.log(cars);

  const fetchCars = async () => {
    const response = await api.get(
      `/api/cars/?origin_city=${origin ? origin : ""}&destination_city=${
        destination ? destination : ""
      }&available_from_before=${departure ? departure : ""}`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      if (result.length > 0) {
        setCars(result);
      } else {
        setMessage("No cars available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      if (origin || destination || departure) {
        fetchCars();
      } else {
        setMessage("No cars available");
      }
    }
  }, [location.search]);

  return (
    <>
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
                <div className="mx-2 mt-4 grid grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 transition sm:mx-auto">
                  <a
                    href="#"
                    className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-lg">
                      <img
                        src="/plane.png"
                        alt
                        className="h-full w-full object-cover text-gray-700"
                      />
                    </div>
                  </a>
                  <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                    <h3 className="text-sm text-gray-600">Invision</h3>
                    <a
                      href="#"
                      className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                    >
                      {" "}
                      Sr. Frontend Engineer{" "}
                    </a>
                    <p className="overflow-hidden pr-7 text-sm">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna .
                    </p>
                    <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                      <div className>
                        Experience:
                        <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                          {" "}
                          2 Years{" "}
                        </span>
                      </div>
                      <div className>
                        Salary:
                        <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                          180-250k
                        </span>
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
    </>
  );
}
