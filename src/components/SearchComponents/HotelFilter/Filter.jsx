import api from "@/api/api";
import CityModal from "@/components/CityModal/HotelCityModal";
import Navigation from "@/components/Navigation/Navigation";
import { cities } from "@/components/cities/cities";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateInput from "../DatePicker/DateInput";

const Filter = () => {
  const [rooms, setRooms] = useState(1);
  const [city, setCity] = useState();
  const [checkinDate, setCheckinDate] = useState(
    format(new Date(), "yyy-MM-dd")
  );
  const [departureTime, setDepartureTime] = useState(
    format(new Date(), "HH:mm")
  );
  const [checkoutDate, setCheckoutDate] = useState(
    format(new Date(), "yyy-MM-dd")
  );
  const [arrivalTime, setArrivalTime] = useState(format(new Date(), "HH:mm"));
  const [airports, setAirports] = useState();
  const navigate = useNavigate();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const handleSearch = (e) => {
    navigate(
      `/hotel/?city=${
        city !== null || city !== undefined ? city : ""
      }&checkin=${checkinDate}&checkout=${checkoutDate}&room=${rooms}`
    );
  };

  const [search, setSearch] = useState("");
  const country = useSelector((state) => state.countryCurrencyReducer?.country);
  const countryAbbreviation = country && country === "India" ? "IN" : "AE";

  const CategorizeCities = cities?.filter((city) => {
    return city.country_code === countryAbbreviation;
  });

  const searchedCity = [
    ...new Set(
      cities?.filter((place) => {
        return (
          !/^\d+$/.test(place.name) &&
          place.name.toLowerCase().includes(search.toLowerCase())
        );
      })
    ),
  ];

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
                City
              </label>
              <div className="">
                <button
                  data-hs-overlay="#hs-notifications-21"
                  required
                  autoComplete=""
                  name="from"
                  className=" hs-dropdown-toggle mt-2 block w-full rounded-md   outline-none  focus:ring-0 placeholder:text-lg placeholder:text-gray-800 placeholder:font-medium text-left bg-white text-2xl font-medium capitalize"
                >
                  {city ? city : "Select City"}
                </button>
              </div>
            </div>

            <div className="flex flex-col pl-2  pt-2 ">
              <label
                htmlFor="name"
                className="text-stone-600 text-sm uppercase font-medium"
              >
                Check In
              </label>
              <div className="hs-dropdown relative inline-flex [--auto-close:false]">
                <DateInput
                  setDate={setCheckinDate}
                  setTime={setDepartureTime}
                />
              </div>
            </div>
            <div className="flex flex-col pl-2  pt-2 ">
              <label
                htmlFor="name"
                className="text-stone-600 text-sm uppercase font-medium"
              >
                Check Out
              </label>
              <div className="hs-dropdown relative inline-flex [--auto-close:false]">
                <DateInput setDate={setCheckoutDate} setTime={setArrivalTime} />
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end items-center px-4 gap-x-2">
            <button
              type="button"
              onClick={() => {
                handleSearch();
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
        action={setCity}
        id={21}
      />
    </div>
  );
};

export default Filter;
