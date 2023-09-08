import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "@/api/api";
import Filter from "@/components/SearchComponents/FlightFilter/Filter";
import { useLocation, useSearchParams } from "react-router-dom";
import Offers from "@/components/Offers/Offers";
import NewFilter from "@/components/NewFilter/NewFilter";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
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
  const [flights, setFlights] = useState();
  const fetchFlights = async () => {
    const response = await api.get(
      // `/api/flights/?departure_airport_city=${
      //   origin ? origin.replace(" ", "+") : ""
      // }&arrival_airport_city=${
      //   destination ? destination.replace(" ", "+") : ""
      // }&departure_time=${departure ? departure : ""}&arrival_time=${
      //   arrival ? arrival : ""
      // }&available_seats_min=${travellers ? travellers : 1}&available_seats_max=`
      `/api/flights/`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      if (result.length > 0) {
        setFlights(result);
      } else {
        setMessage("No flights available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    // if (searchParams.size > 0) {
    //   if (origin || destination || departure || arrival || travellers) {
    //     fetchFlights();
    //   } else {
    //     setMessage("No flights available");
    //   }
    // }
    fetchFlights();
  }, [location.search]);

  const [tickets, setTickets] = useState([]);

  const increaseTicket = (flightId) => {
    setTickets((prevTickets) => ({
      ...prevTickets,
      [flightId]: (prevTickets[flightId] || 1) + 1,
    }));
  };

  const decreaseTicket = (flightId) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      if (updatedTickets[flightId] > 0) {
        updatedTickets[flightId]--;
      }
      return updatedTickets;
    });
  };
  return (
    <div>
      <main className="">
        <div className="bg-[#07162d]">
          {/* <Filter /> */}
          <NewFilter />
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
                  {flights?.map((flight) => (
                    <div
                      key={flight.id}
                      className="mx-2 mt-4 grid grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 transition sm:mx-auto"
                    >
                      <div className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
                        <div className="h-16 w-16 overflow-hidden rounded-lg">
                          <img
                            src="/plane.png"
                            alt={flight.name}
                            className="h-full w-full object-cover text-gray-700"
                          />
                        </div>
                      </div>
                      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                        <h3 className=" text-gray-600">
                          {flight.airline.name}
                        </h3>
                        <div className="mb-3 overflow-hidden pr-7 text-lg font-semibold">
                          {flight.name}
                        </div>

                        <div className="flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 sm:justify-between">
                          <div className="">
                            <span className="font-bold sm:text-lg rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                              {format(
                                new Date(flight.departure_time),
                                "dd MMM"
                              )}
                            </span>
                            <span className="ml-2 mr-3">
                              {flight.departure_airport.city}
                            </span>
                          </div>
                          {/* <div className="text-center inline-flex items-center justify-center"> */}
                          {/* <BsArrowRight className="mx-auto text-center" /> */}
                          {/* </div> */}
                          <div className="">
                            <span className="font-bold sm:text-lg rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                              {format(new Date(flight.arrival_time), "dd MMM")}
                            </span>
                            <span className="ml-2 mr-3">
                              {flight.arrival_airport.city}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5 items-center">
                          <p className="text-lg font-semibold">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: currencySymbol || "",
                              }}
                            />
                            {flight.price * priceRate}
                          </p>
                          <button
                            className="btn-gradient px-4 py-1 rounded-full "
                            type="button"
                          >
                            Book Now
                          </button>
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
      </main>
    </div>
  );
};

export default Flights;
