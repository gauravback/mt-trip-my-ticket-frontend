import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/api";
import Filter from "@/components/SearchComponents/CarFilter/CarFilter";
import { useLocation } from "react-router-dom";
import Offers from "@/components/Offers/Offers";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSelector } from "react-redux";
import { TbArmchair, TbWindmill } from "react-icons/tb";
export default function Car() {
  const [cars, setCars] = useState();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

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
    fetchCars();
  }, []);

  return (
    <>
      <div className="bg-prime">
        <Filter />
      </div>
      {/* Products */}
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen">
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
          <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3 min-h-full">
            {/* Replace with your content */}
            <div className="h-96 rounded-lg border-l border-gray-200 lg:h-full">
              <div className="grid grid-cols-1 w-full px-4 gap-y-3">
                {/* Card */}
                {cars?.map((car) => (
                  <div className="bg-white border flex items-center border-gray-300 rounded-lg overflow-hidden">
                    <div className="border h-full hidden  md:flex items-center justify-center bg-white p-4">
                      <img
                        src={car.images}
                        width={250}
                        alt={car.make + " " + car.model}
                        className="rounded-md mix-blend-darken"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex">
                        <div className="text-sm mx-2 flex items-center justify-between p-1 rounded text-gray-950 font-bold mt-1 ">
                          <div className="flex items-center space-x-1">
                            <HiOutlineLocationMarker />
                            <span>{car.origin_city}</span>
                          </div>
                          <div className="mx-3">--&gt;</div>
                          <div className="flex items-center space-x-1">
                            <HiOutlineLocationMarker />
                            <span>{car.destination_city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 text-gray-700 md:flex justify-between">
                        <div>
                          <p className="text-xl text-gray-900 font-semibold">
                            {car.make + " " + car.model}{" "}
                            <span className="text-sm">
                              ({car.car_type.type})
                            </span>
                          </p>
                        </div>
                        <div className="leading-loose text-sm">
                          <p className="flex items-center md:justify-end space-x-1">
                            <span className="text-xs">Transmission: </span>
                            <span className="font-semibold">
                              {car.transmission_type}
                            </span>
                          </p>
                          <p className="flex items-center md:justify-end space-x-1">
                            <span className="text-xs">Fuel: </span>
                            <span className="font-semibold">
                              {car.fuel_type}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4  text-gray-600">
                        <div className="flex items-center">
                          <p className="flex items-center space-x-1 ">
                            <span className="text-gray-900 font-bold">
                              <TbArmchair fontSize={20} fontWeight={"bold"} />
                            </span>
                            <span className="text-sm font-bold">
                              {car.seats} Seats
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="flex items-center space-x-1 ">
                            <span className="text-gray-900 font-bold">
                              <TbWindmill fontSize={20} fontWeight={"bold"} />
                            </span>
                            <span className="text-sm font-bold">
                              AC: {car.ac ? "Yes" : "No"}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center">
                          <p className="flex items-center space-x-1 ">
                            <span className="text-gray-900 font-bold">
                              <svg
                                fill="#000000"
                                height="16"
                                width="16"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 181.43 181.43"
                                xmlSpace="preserve"
                                stroke="#000000"
                                strokeWidth="5.080012000000001"
                                transform="rotate(0)"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  stroke="#CCCCCC"
                                  strokeWidth="0.362858"
                                />
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M134.045,66.614c-3.707-1.853-8.211-0.35-10.063,3.354l-23.078,46.156H75.92c-2.841,0-5.438,1.605-6.708,4.146 l-25.151,50.302c-1.853,3.705-0.351,8.21,3.354,10.062c1.077,0.539,2.221,0.794,3.348,0.794c2.751,0,5.4-1.52,6.714-4.148 l23.079-46.156h24.985c2.841,0,5.438-1.605,6.708-4.146l25.15-50.302C139.252,72.972,137.75,68.467,134.045,66.614z" />{" "}
                                    <path d="M143.162,0.718c-13.832,0-25.045,11.212-25.045,25.044c0,13.831,11.213,25.043,25.045,25.043 c13.831,0,25.043-11.212,25.043-25.043C168.205,11.931,156.993,0.718,143.162,0.718z M143.162,35.806 c-5.539,0-10.045-4.505-10.045-10.043c0-5.538,4.506-10.044,10.045-10.044c5.538,0,10.043,4.506,10.043,10.044 C153.205,31.3,148.7,35.806,143.162,35.806z" />{" "}
                                    <path d="M104.121,45.446C104.121,20.387,83.732,0,58.671,0c-25.06,0-45.447,20.387-45.447,45.446 c0,25.061,20.388,45.449,45.447,45.449C83.732,90.895,104.121,70.507,104.121,45.446z M28.224,45.446 C28.224,28.658,41.883,15,58.671,15c16.79,0,30.449,13.658,30.449,30.446c0,16.79-13.66,30.449-30.449,30.449 C41.883,75.895,28.224,62.236,28.224,45.446z" />{" "}
                                  </g>{" "}
                                </g>
                              </svg>
                            </span>
                            <span className="text-sm font-bold">
                              Airbags: {car.bags ? "Yes" : "No"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1 px-4  text-gray-900">
                        <div className="flex items-center">
                          <p className="flex items-center space-x-1 ">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: currencySymbol,
                              }}
                              className="text-xl"
                            ></span>
                            <span className="text-xl font-bold">
                              {Math.round(car.price * priceRate * 100) / 100}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="flex items-center space-x-1 ">
                            <button
                              type="button"
                              className="btn-gradient px-2 p-0.5 rounded-md"
                            >
                              Book Now
                            </button>
                          </p>
                        </div>
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
    </>
  );
}
