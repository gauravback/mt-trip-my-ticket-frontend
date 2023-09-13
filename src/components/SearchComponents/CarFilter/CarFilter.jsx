import api from "@/api/api";
import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CarFilter = () => {
  const [cities, setCities] = useState();

  const fetchCities = async () => {
    const response = await api.get(`/api/cars/`);
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

  const naviagte = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, departure } = e.target;

    naviagte(
      `/car/?origin=${from.value ? from.value : ""}&destination=${
        to.value ? to.value : ""
      }&departure=${departure.value ? departure.value : ""}`
    );
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-lg sm:py-12 relative">
        <Navigation />
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="sm:rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3  px-3">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                From
              </label>
              <select
                type="text"
                id="from"
                required
                name="from"
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-[1.15rem] px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold bg-white text-xl font-bold"
              >
                <option value="" selected hidden>
                  Origin
                </option>
                {cities ? (
                  cities.map(({ id, origin_city }) =>
                    origin_city !== "" ? (
                      <option
                        key={id}
                        value={origin_city.toLowerCase()}
                        className=""
                      >
                        {origin_city}
                      </option>
                    ) : null
                  )
                ) : (
                  <option className="">Loading...</option>
                )}
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
                required
                name="to"
                placeholder="Delhi"
                className="mt-2 block w-full rounded-md border border-gray-200 py-[1.15rem] px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold bg-white text-xl font-bold"
              >
                <option selected hidden value="">
                  Destination
                </option>
                {cities ? (
                  cities.map(({ id, destination_city }) =>
                    destination_city !== "" ? (
                      <option
                        key={id}
                        value={destination_city.toLowerCase()}
                        className=""
                      >
                        {destination_city}
                      </option>
                    ) : null
                  )
                ) : (
                  <option className="">Loading...</option>
                )}
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
                required
                name="departure"
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-[1.20rem] px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
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

export default CarFilter;
