import api from "@/api/api";
import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BusFilter = () => {
  const [cities, setCities] = useState();

  const fetchCities = async () => {
    const response = await api.get(`/api/buses/`);
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      setCities(result);
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
      `/bus/?origin=${from.value}&destination=${to.value}&date=${departure.value}`
    );
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-lg sm:py-12 relative">
        <Navigation />
        <form
          method="POST"
          onSubmit={handleSearch}
          className="sm:rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 px-3">
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
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold text-xl font-bold bg-white"
              >
                <option value="" selected hidden>
                  From
                </option>
                {cities &&
                  cities.map(({ id, departure_station }) => (
                    <option key={id} value={departure_station}>
                      {departure_station}
                    </option>
                  ))}
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
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold text-xl font-bold bg-white"
              >
                <option value="" selected hidden>
                  To
                </option>
                {cities &&
                  cities.map(({ id, arrival_station }) => (
                    <option key={id} value={arrival_station}>
                      {arrival_station}
                    </option>
                  ))}
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
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
              />
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

export default BusFilter;
