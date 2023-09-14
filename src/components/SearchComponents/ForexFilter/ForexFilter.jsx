import React, { useEffect, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import Datepicker from "react-tailwindcss-datepicker";
import Navigation from "../../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import DateInput from "../DatePicker/DateInput";

const Filter = () => {
  const [departureDate, setDepartureDate] = useState();

  const naviagte = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to } = e.target;
    naviagte(
      `/car/?origin=${from.value ? from.value : ""}&destination=${
        to.value ? to.value : ""
      }&departure=${departureDate ? departureDate : ""}`
    );
  };

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
  return (
    <div className="mx-auto">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <Navigation />
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl  border">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl gap-x-4 mx-auto items-center">
                <div className="md:flex items-center justify-center w-full">
                  <div className="w-full">
                    <label
                      htmlFor="from"
                      className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                    >
                      Visa For
                    </label>
                    <select
                      id="from"
                      name="from"
                      className="px-4 py-4 block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold"
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
                  <div className="hidden md:flex items-center justify-center p-3 border rounded-full w-12 ml-4 mt-8">
                    <TbArrowsExchange />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="to"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Slect Nationalty
                  </label>
                  <select
                    id="to"
                    name="to"
                    className="px-4 py-4  block w-full text-xl border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 font-bold"
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

                <div className="">
                  <label
                    htmlFor="departure"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Departure
                  </label>

                  <DateInput id="departure" setDate={setDepartureDate} />
                </div>

                {/* <div className="">
                  <label
                    htmlFor="return"
                    className="inline-block text-lg font-semibold text-gray-800 my-2.5"
                  >
                    Return
                  </label>
                  <Datepicker
                    asSingle={true}
                    primaryColor="blue"
                    value={returnDate}
                    onChange={handleReturnDateChange}
                    inputClassName="focus:outline-none focus:ring-0 p-3 block w-full text-lg border border-gray-200 shadow-sm rounded-lg focus:outline-none focus:ring-0 overflow-hidden"
                    useRange={false}
                    displayFormat={"DD-MM-YYYY"}
                    containerClassName="overflow-hidden"
                  />
                </div> */}
              </div>

              <div className="mt-5 flex justify-center gap-x-2">
                <button
                  type="submit"
                  className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold btn-gradient text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
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
