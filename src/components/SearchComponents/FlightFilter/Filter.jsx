import React, { useEffect, useState } from "react";
import Navigation from "../../Navigation/Navigation";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 1,
  });
  const [route, setRoute] = useState("oneway");
  const [airports, setAirports] = useState();
  const fetchAirports = async () => {
    const response = await api.get(`/api/airports/`);
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      setAirports(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const { from, to, departure, arrival } = e.target;
    navigate(
      `/flight/?origin=${from.value}&destination=${to.value}&departure=${
        departure.value ? departure.value : ""
      }&returnDate=${arrival ? arrival?.value : ""}&adults=${
        travellers.adults
      }&children=${travellers.children}`
    );
  };

  const increaseAdults = () => {
    if (travellers.adults < 10) {
      setTravellers((prevState) => ({
        ...prevState,
        adults: prevState.adults + 1,
      }));
    }
  };
  const decreaseAdults = () => {
    if (travellers.adults > 1) {
      setTravellers((prevState) => ({
        ...prevState,
        adults: prevState.adults - 1,
      }));
    }
  };
  const increaseChildren = () => {
    if (travellers.children < 10) {
      setTravellers((prevState) => ({
        ...prevState,
        children: prevState.children + 1,
      }));
    }
  };
  const decreaseChildren = () => {
    if (travellers.children > 1) {
      setTravellers((prevState) => ({
        ...prevState,
        children: prevState.children - 1,
      }));
    }
  };

  return (
    <div  className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 pt-12">
      <div className="mx-auto max-w-screen-lg sm:py-12 relative">
        <Navigation />
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="sm:rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-3">
            <div className="flex flex-col">
              <label
                htmlFor="from"
                className="text-stone-600 text-xs font-medium"
              >
                From
              </label>
              <select
                type="text"
                id="from"
                name="from"
                required
                placeholder="From"
                className="mt-2 block w-full rounded-md border bg-white border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring-0 placeholder:text-xl font-bold text-xl placeholder:text-gray-900 placeholder:font-bold"
              >
                <option value="" selected hidden>
                  Origin
                </option>
                {airports ? (
                  airports.map(({ id, city }) => (
                    <option key={id} value={city.toLowerCase()} className="">
                      {city}
                    </option>
                  ))
                ) : (
                  <option className="">Loading...</option>
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="to"
                className="text-stone-600 text-xs font-medium"
              >
                To
              </label>
              <select
                type="text"
                id="to"
                name="to"
                placeholder="To"
                required
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold text-xl font-bold bg-white"
              >
                <option value="" selected hidden>
                  Destination
                </option>
                {airports ? (
                  airports.map(({ id, city }) => (
                    <option key={id} value={city.toLowerCase()} className="">
                      {city}
                    </option>
                  ))
                ) : (
                  <option className="">Loading...</option>
                )}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="departure"
                className="text-stone-600 text-xs font-medium"
              >
                Departure
              </label>
              <input
                type="date"
                id="departure"
                name="departure"
                placeholder="Ahemdabad"
                required
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="arrival"
                className="text-stone-600 text-xs font-medium"
              >
                Return
              </label>
              <input
                type="date"
                id="arrival"
                disabled={route === "oneway" && true}
                name="arrival"
                placeholder="Ahemdabad"
                className={`mt-2 block w-full rounded-md ${
                  route === "oneway" && "bg-gray-200"
                }  border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gra-900 placeholder:font-bold`}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Travellers
              </label>
              <div className="hs-dropdown  [--auto-close:inside] relative inline-flex">
                <button
                  id="hs-dropdown-default"
                  type="button"
                  className="hs-dropdown-toggle mt-2 py-[1.1rem] px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border font-bold bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-xl"
                >
                  Travellers
                  <svg
                    className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                  aria-labelledby="hs-dropdown-default"
                >
                  <div className="flex items-center justify-between  py-2 px-3 rounded-md text-sm text-gray-800 focus:ring-0">
                    Adults
                    <div className="inline-flex rounded-md ">
                      <button
                        type="button"
                        onClick={decreaseAdults}
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        {travellers.adults}
                      </button>
                      <button
                        onClick={increaseAdults}
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between  py-2 px-3 rounded-md text-sm text-gray-800 focus:ring-0">
                    Children
                    <div className="inline-flex rounded-md ">
                      <button
                        onClick={decreaseChildren}
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        {travellers.children}
                      </button>
                      <button
                        type="button"
                        onClick={increaseChildren}
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-between items-center px-4 gap-x-2">
            <div className="flex gap-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="hs-radio-group"
                  className="shrink-0 p-1  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 "
                  id="oneway"
                  onChange={() => {
                    setRoute("oneway");
                  }}
                  defaultChecked={route === "oneway" && true}
                />
                <label htmlFor="oneway" className="text- text-gray-500 ml-2">
                  One Way
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="hs-radio-group"
                  className="shrink-0 p-1  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 "
                  id="roundtrip"
                  defaultChecked={route === "roundtrip" && true}
                  onChange={() => {
                    setRoute("roundtrip");
                  }}
                />
                <label htmlFor="roundtrip" className="text- text-gray-500 ml-2">
                  Round Trip
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
