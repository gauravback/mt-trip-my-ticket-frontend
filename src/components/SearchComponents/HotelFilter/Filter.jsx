import api from "@/api/api";
import Navigation from "@/components/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const [cities, setCities] = useState();

  const fetchHotelCities = async () => {
    const response = await api.get(`/api/hotels/`);
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      setCities(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchHotelCities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const { city, checkin, checkout, price } = e.target;
    navigate(
      `/hotel/?city=${city.value}&checkin=${checkin.value}&checkout=${checkout.value}&room=${rooms}&price=${price.value}`
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
                htmlFor="city"
                className="text-stone-600 text-xs font-medium"
              >
                City
              </label>
              <select
                type="text"
                id="city"
                name="city"
                required
                placeholder="Ahemdabad"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
              >
                <option value="" selected hidden>
                  City
                </option>
                {cities?.map(({ id, city }) => (
                  <option key={id} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Check In
              </label>
              <input
                type="date"
                id="checkin"
                required
                name="checkin"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gray-900 placeholder:font-bold"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Check Out
              </label>
              <input
                type="date"
                id="checkout"
                required
                name="checkout"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-xl placeholder:text-gra-900 placeholder:font-bold"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-xs font-medium"
              >
                Rooms & Price
              </label>
              <div className="hs-dropdown  [--auto-close:inside] relative inline-flex">
                <button
                  id="hs-dropdown-default"
                  type="button"
                  className="hs-dropdown-toggle mt-2 py-[1.1rem] px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border font-bold bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-xl"
                >
                  Rooms & Price
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
                        onClick={() => {
                          if (rooms > 1) {
                            setRooms(rooms - 1);
                          }
                        }}
                        type="button"
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
                        onClick={() => {
                          if (rooms < 10) {
                            setRooms(rooms + 1);
                          }
                        }}
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between  py-2 px-3 rounded-md text-sm text-gray-800 focus:ring-0">
                    Price
                    <div className="inline-flex rounded-md ">
                      <select
                        type="text"
                        name="price"
                        required
                        id="price"
                        className="py-2 px-4 inline-flex justify-center w-32 items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        <option value="0-1499">
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          0 - {parseFloat(1500 * priceRate).toFixed(0)}
                        </option>
                        <option value="1500-1999">
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {parseFloat(1500 * priceRate).toFixed(0)}-
                          {parseFloat(2500 * priceRate).toFixed(0)}
                        </option>
                        <option value="2500-4999">
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {parseFloat(2500 * priceRate).toFixed(0)}-
                          {parseFloat(5000 * priceRate).toFixed(0)}
                        </option>
                        <option value="5000-">
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {parseFloat(5000 * priceRate).toFixed(0)}+
                        </option>
                      </select>
                    </div>
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

export default Filter;
