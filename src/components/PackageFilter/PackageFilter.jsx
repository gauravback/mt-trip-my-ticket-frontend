import React, { useEffect, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import Navigation from "../Navigation/Navigation";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import DateInput from "../DatePicker/DateInput";

const Filter = () => {
  const [cities, setCities] = useState();

  const fetchHotelCities = async () => {
    const response = await api.get(`/api/packages/`);
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

  const [departureDate, setDepartureDate] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, with_flights, rooms } = e.target;

    navigate(
      `/package/?origin=${from.value}&destination=${to.value}&departure=${
        departureDate ? departureDate : ""
      }&with_flights=${with_flights.value}&rooms=${rooms.value}`
    );
  };

  return (
    <div className="mx-auto " style={{ backgroundImage: `url("/bg2.jpg")` }}>
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
                      required
                      className="px-4 py-4 block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold"
                    >
                      <option value="" selected hidden>
                        Origin
                      </option>
                      {cities ? (
                        cities.map(({ id, origin_city }) => (
                          <option
                            key={id}
                            value={origin_city.split(",")[0].toLowerCase()}
                            className=""
                          >
                            {origin_city.split(",")[0]}
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
                    required
                    className="px-4 py-4  block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold capitalize"
                  >
                    <option value="" selected hidden>
                      Destination
                    </option>
                    {cities ? (
                      cities.map(({ id, destination_city }) => (
                        <option
                          key={id}
                          value={destination_city.split(",")[0].toLowerCase()}
                          className=""
                        >
                          {destination_city.split(",")[0]}
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
                    htmlFor="with_flights"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    With Flights
                  </label>
                  <select
                    id="with_flights"
                    name="with_flights"
                    required
                    className="p-3 block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 "
                  >
                    <option value="" disabled hidden></option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="">
                  <label
                    htmlFor="rooms"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Rooms
                  </label>
                  <select
                    id="rooms"
                    name="rooms"
                    required
                    className="p-3 block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 "
                  >
                    <option value="" disabled hidden>
                      No. of rooms
                    </option>
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
                  className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
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
