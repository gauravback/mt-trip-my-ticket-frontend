import React, { useEffect, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import Navigation from "../Navigation/Navigation";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import DateInput from "../DatePicker/DateInput";

const Filter = () => {
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

  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, travellers } = e.target;
    navigate(
      `/flight/?origin=${from.value}&destination=${to.value}&departure=${
        departureDate ? departureDate : ""
      }&return=${returnDate ? returnDate : ""}&travellers=${travellers.value}`
    );
  };

  return (
    <div className="mx-auto">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <Navigation />
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl  border">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl gap-x-4 mx-auto items-center">
                <div className="md:flex items-center justify-center w-full">
                  <div className="w-full">
                    <label
                      htmlFor="from"
                      className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                    >
                      From
                    </label>
                    <select
                      id="from"
                      name="from"
                      className="px-4 py-4 block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold"
                    >
                      <option value="">Origin</option>
                      {airports ? (
                        airports.map(({ id, city }) => (
                          <option
                            key={id}
                            value={city.toLowerCase()}
                            className=""
                          >
                            {city}
                          </option>
                        ))
                      ) : (
                        <option className="">Loading...</option>
                      )}
                    </select>
                  </div>
                  <div className="hidden md:flex items-center justify-center p-3 border rounded-full w-12 ml-4 mt-8">
                    <TbArrowsExchange />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="to"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    To
                  </label>
                  <select
                    id="to"
                    name="to"
                    className="px-4 py-4  block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold capitalize"
                  >
                    <option value="">Destination</option>
                    {airports ? (
                      airports.map(({ id, city }) => (
                        <option
                          key={id}
                          value={city.toLowerCase()}
                          className=""
                        >
                          {city}
                        </option>
                      ))
                    ) : (
                      <option className="">Loading...</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3  gap-x-4 mx-auto items-center">
                <div className="">
                  <label
                    htmlFor="departure_date"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Departure Date
                  </label>

                  <DateInput id="departure_date" setDate={setDepartureDate} />
                </div>

                <div className="">
                  <label
                    htmlFor="return_date"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Return Date
                  </label>
                  <DateInput id="return_date" setDate={setReturnDate} />
                </div>
                <div className="">
                  <label
                    htmlFor="travellers"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Travellers
                  </label>
                  <select
                    id="travellers"
                    className="p-3 block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 "
                  >
                    <option value="">No. of travellers</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-x-2">
                <button
                  type="submit"
                  className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-gray-700 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
