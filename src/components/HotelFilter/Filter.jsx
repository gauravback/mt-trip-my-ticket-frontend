import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import toast from "react-hot-toast";
import DateInput from "../DatePicker/DateInput";

const Filter = () => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { city, rooms, price } = e.target;
    const [minPrice, maxPrice] = price.value.split("-");

    navigate(
      `/hotel/?city=${city.value}&rooms=${
        rooms.value
      }&min-price=${minPrice}&max-price=${maxPrice}&checkin=${
        checkInDate ? checkInDate : ""
      }&checkout=${checkOutDate ? checkOutDate : ""}`
    );
  };

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
  return (
    <div className="mx-auto" style={{ backgroundImage: `url("/bg2.jpg")` }}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <Navigation />
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl  border">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-x-4 mx-auto items-center">
                <div className="md:flex items-center justify-center w-full">
                  <div className="w-full">
                    <label
                      htmlFor="city"
                      className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      className="px-4 py-4 block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0"
                    >
                      <option value="" selected hidden>
                        City
                      </option>
                      {cities ? (
                        cities.map(({ id, city }) => (
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

                <div className="">
                  <label
                    htmlFor="rooms"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Rooms
                  </label>
                  <select
                    id="rooms"
                    className="px-4 py-4  block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0"
                  >
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
                <div className="">
                  <label
                    htmlFor="price"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Price
                  </label>
                  <select
                    id="price"
                    className="px-4 py-4  block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0"
                  >
                    <option value="0-1499">&#8377;0-1500</option>
                    <option value="1500-1999">&#8377;1500-2500</option>
                    <option value="2500-4999">&#8377;2500-5000</option>
                    <option value="5000-">&#8377;5000+</option>
                  </select>
                </div>

                <div className="">
                  <label
                    htmlFor="checkin"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Check In
                  </label>

                  <DateInput id="checkin" setDate={setCheckInDate} />
                </div>
                <div className="">
                  <label
                    htmlFor="checkout"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Check Out
                  </label>

                  <DateInput id="checkout" setDate={setCheckOutDate} />
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
