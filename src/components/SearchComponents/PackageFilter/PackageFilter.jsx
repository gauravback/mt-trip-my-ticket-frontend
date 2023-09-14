import api from "@/api/api";
import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdStarRate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PackageFilter = () => {
  const [rooms, setRooms] = useState(1);
  const [withFlights, setWithFlights] = useState(false);

  const [cities, setCities] = useState();
  const fetchCities = async (e) => {
    const response = await api.get("/api/packages/");
    const data = await response.data;
    const status = await response.status;
    if (status === 200) {
      setCities(data);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchCities();
  }, []);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const { from, to, departure } = e.target;

    navigate(
      `/package/?origin=${from.value}&destination=${to.value}&departure=${departure.value}&rooms=${rooms}&withFlights=${withFlights}`
    );
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-lg sm:py-12 relative">
        <Navigation />
        <form
          onSubmit={handleSearch}
          method="POST"
          className="sm:rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4 px-3">
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
                defaultValue=""
                name="from"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold text-xl font-bold bg-white"
              >
                <option value="" hidden>
                  From
                </option>
                {cities?.map(({ id, origin_city }) => (
                  <option key={id} value={origin_city}>
                    {origin_city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                To
              </label>
              <select
                type="text"
                id="to"
                name="to"
                defaultValue=""
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold text-xl font-bold bg-white"
              >
                <option value="" hidden>
                  To
                </option>
                {cities?.map(({ id, destination_city }) => (
                  <option key={id} value={destination_city}>
                    {destination_city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Departure
              </label>
              <input
                type="date"
                id="departure"
                name="departure"
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Rooms & Ratings
              </label>
              <div className="hs-dropdown  [--auto-close:inside] relative inline-flex">
                <button
                  id="hs-dropdown-default"
                  type="button"
                  className="hs-dropdown-toggle mt-2 py-[1.15rem] px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border font-bold bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-lg"
                >
                  Rooms & Ratings
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
                    Rooms
                    <div className="inline-flex rounded-md ">
                      <button
                        type="button"
                        onClick={() => {
                          if (rooms > 1) {
                            setRooms(rooms - 1);
                          }
                        }}
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        {rooms}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (rooms < 10) {
                            setRooms(rooms + 1);
                          }
                        }}
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between  py-2 px-3 rounded-md text-sm text-gray-800 focus:ring-0">
                    <button
                      type="button"
                      onClick={() => {
                        setWithFlights(true);
                      }}
                      className={`py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-lg first:ml-0 last:rounded-lg border font-medium ${
                        withFlights
                          ? "bg-red-100 text-red-700"
                          : "bg-white text-gray-700"
                      }  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-xs`}
                    >
                      With Flights
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setWithFlights(false);
                      }}
                      className={`py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-lg first:ml-0 last:rounded-lg border font-medium ${
                        withFlights
                          ? "bg-white text-gray-700"
                          : "bg-red-100 text-red-700"
                      }  align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-xs`}
                    >
                      Without Flights
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-x-2">
            <button
              type="submit"
              className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageFilter;
