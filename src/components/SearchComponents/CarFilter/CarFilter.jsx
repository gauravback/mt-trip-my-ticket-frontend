import CityModal from "@/components/CityModal/CarCityModal";
import Navigation from "@/components/Navigation/Navigation";
import { cities } from "@/components/cities/cities";
import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateInput from "../DatePicker/DateInput";

const CarFilter = () => {
  const [search, setSearch] = useState("");
  const [route, setRoute] = useState("oneway");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const [departureDate, setDepartureDate] = useState(
    format(new Date(), "yyy-MM-dd")
  );

  const [departureTime, setDepartureTime] = useState(
    format(new Date(), "hh:mm aa")
  );
  const country = useSelector((state) => state.countryCurrencyReducer?.country);

  const countryAbbreviation = country && country === "India" ? "IN" : "AE";

  const CategorizeCities = cities?.filter((city) => {
    return city.country_code === countryAbbreviation;
  });

  const searchedCity = [
    ...new Set(
      CategorizeCities?.filter((place) => {
        return (
          !/^\d+$/.test(place.name) &&
          place.name.toLowerCase().includes(search.toLowerCase())
        );
      })
    ),
  ];

  const naviagte = useNavigate();
  const handleSubmit = () => {
    naviagte(
      `/car/?origin=${fromCity}&destination=${toCity}&departure=${departureDate}`
    );
  };

  return (
    <div
      style={{
        background: `url("/banner-new.jpg")`,
        margin: "0 auto",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:pt-12"
    >
      <div className="mx-auto max-w-screen-lg sm:py-12 relative">
        <Navigation />
        <div className="sm:rounded-xl border border-gray-200 bg-white p-2 md:shadow-lg">
          <div className="mt-8 grid grid-cols-1  border divide-x rounded-md py-1 gap-1 md:grid-cols-2 lg:grid-cols-3  px-3">
            <div className="flex flex-col pl-2 pt-2">
              <label
                htmlFor="name"
                className="text-stone-600 uppercase text-sm font-medium"
              >
                From
              </label>
              <div className="">
                <button
                  data-hs-overlay="#hs-notifications-1"
                  required
                  autoComplete=""
                  name="from"
                  className=" hs-dropdown-toggle mt-2 block w-full rounded-md   outline-none  focus:ring-0 placeholder:text-2xl placeholder:text-gray-800 placeholder:font-medium text-left bg-white text-2xl font-medium capitalize"
                >
                  {fromCity ? fromCity : "Origin City"}
                </button>
              </div>
            </div>
            <div className="flex flex-col pl-2 pt-2">
              <label
                htmlFor="name"
                className="text-stone-600 uppercase text-sm font-medium"
              >
                To
              </label>
              <div className="">
                <button
                  data-hs-overlay="#hs-notifications-2"
                  required
                  autoComplete=""
                  name="to"
                  className=" hs-dropdown-toggle mt-2 block w-full rounded-md   outline-none  focus:ring-0 placeholder:text-2xl placeholder:text-gray-800 placeholder:font-medium text-left bg-white text-2xl font-medium capitalize"
                >
                  {toCity ? toCity : "Destination City"}
                </button>
              </div>
            </div>

            <div className="flex flex-col pl-2  pt-2 ">
              <label
                htmlFor="name"
                className="text-stone-600 text-sm uppercase font-medium"
              >
                Departure
              </label>
              <div className="hs-dropdown relative inline-flex [--auto-close:false]">
                <DateInput
                  setDate={setDepartureDate}
                  setTime={setDepartureTime}
                />
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
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <CityModal
        cities={searchedCity}
        setSearch={setSearch}
        action={setFromCity}
        id={1}
      />
      <CityModal
        cities={searchedCity}
        setSearch={setSearch}
        action={setToCity}
        id={2}
      />
    </div>
  );
};

export default CarFilter;
