import api from "@/api/api";
import Filter from "@/components/SearchComponents/HotelFilter/Filter";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineStar } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Hotel = () => {
  const [hotels, setHotels] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const room = searchParams.get("room");
  const price = searchParams.get("price");

  const [star, setStar] = useState();
  const [wifi, setWifi] = useState();
  const [parking, setParking] = useState();

  const fetchHotels = async () => {
    try {
      const res = await api.get(
        `/api/hotels/?city=${city ? city : ""}&pin=&star_category=${
          star ? star : ""
        }&amenities=&tax_type=&tax_percent_min=&tax_percent_max=&total_rooms_min=&total_rooms_max=&available_rooms_min=${
          room ? room : ""
        }&available_rooms_max=&price_min=${
          price ? price.split("-")[0] : ""
        }&price_max=${price ? price.split("-")[1] : ""}&available_from_after=${
          checkin ? checkin : ""
        }&available_from_before=${
          checkout ? checkout : ""
        }&available_to_after=&available_to_before=&wifi_available=${
          wifi === null || wifi === undefined ? "" : wifi
        }&parking_available=${
          parking === null || parking === undefined ? "" : parking
        }`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setHotels(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [location.search, star, wifi, parking]);

  return (
    <div>
      <div className="">
        <Filter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="hidden md:block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Star
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setStar(1);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                    >
                      1{" "}
                      <MdOutlineStar
                        className="text-yellow-400"
                        fontSize={18}
                      />
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={() => {
                        setStar(2);
                      }}
                      type="text"
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                    >
                      2{" "}
                      <MdOutlineStar
                        className="text-yellow-400"
                        fontSize={18}
                      />
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setStar(3);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                    >
                      3{" "}
                      <MdOutlineStar
                        className="text-yellow-400"
                        fontSize={18}
                      />
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setStar(4);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                    >
                      4{" "}
                      <MdOutlineStar
                        className="text-yellow-400"
                        fontSize={18}
                      />
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setStar(5);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                    >
                      5{" "}
                      <MdOutlineStar
                        className="text-yellow-400"
                        fontSize={18}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200  w-full md:my-10 my-8" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    WiFi Available
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setWifi(true);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setWifi(false);
                      }}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200  w-full md:my-10 my-8" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Parking Available
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setParking(true);
                      }}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => {
                        setParking(false);
                      }}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-gray-800  flex md:hidden items-center m-3"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <span className="text-lg">Filters</span>
            <AiOutlinePlus />
          </button>

          {/* Sidebar */}
          <div
            id="application-sidebar"
            className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[1000] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:translate-x-0 lg:right-auto lg:bottom-0"
          >
            <div className="px-6">
              <p className="flex-none text-xl font-semibold dark:text-white">
                Filters
              </p>
            </div>
            <nav
              className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <div className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full">
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-xl lg:leading-6 leading-5 font-medium ">
                      Star
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 flex-wrap">
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setStar(1);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                      >
                        1{" "}
                        <MdOutlineStar
                          className="text-yellow-400"
                          fontSize={18}
                        />
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          setStar(2);
                        }}
                        type="text"
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                      >
                        2{" "}
                        <MdOutlineStar
                          className="text-yellow-400"
                          fontSize={18}
                        />
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setStar(3);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                      >
                        3{" "}
                        <MdOutlineStar
                          className="text-yellow-400"
                          fontSize={18}
                        />
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setStar(4);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                      >
                        4{" "}
                        <MdOutlineStar
                          className="text-yellow-400"
                          fontSize={18}
                        />
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setStar(5);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out flex items-center justify-center text-"
                      >
                        5{" "}
                        <MdOutlineStar
                          className="text-yellow-400"
                          fontSize={18}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="bg-gray-200  w-full md:my-10 my-8" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-xl lg:leading-6 leading-5 font-medium ">
                      WiFi Available
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setWifi(true);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        Yes
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setWifi(false);
                        }}
                        className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="bg-gray-200  w-full md:my-10 my-8" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-xl lg:leading-6 leading-5 font-medium ">
                      Parking Available
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setParking(true);
                        }}
                        className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        Yes
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => {
                          setParking(false);
                        }}
                        className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Sidebar End */}
        </div>
        <div className="md:w-2/3 p-3 w-full">
          <div className="grid grid-cols-1 e-full lg:gap-y-4 gap-6">
            {/* Card */}
            {hotels?.map((hotel) => (
              <div
                key={hotel.id}
                className="flex w-full flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-4xl mx-auto border  bg-white"
              >
                <div className="w-full md:w-1/5 bg-white grid place-items-center">
                  <img
                    src={hotel.image}
                    alt="tailwind logo"
                    className="rounded-xl h-full object-cover max-h-40"
                  />
                </div>
                <div className="w-full md:w-4/5 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="text-gray-500 text-sm font-medium hidden md:block">
                      {hotel.city}
                    </p>
                    <div className="flex items-center">
                      {Array.from(
                        { length: hotel.star_category },
                        (_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )
                      )}

                      <p className="text-gray-600 font-bold text-xs ml-1">
                        {hotel.star_category} Stars
                      </p>
                    </div>
                  </div>
                  <h3 className="font-black text-gray-800 md:text-xl text-base">
                    {hotel.name}
                  </h3>
                  <p className="md:text-base text-gray-500 text-sm">
                    {hotel.description.slice(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-gray-800">
                      {priceRate === "Loading" ? (
                        "Loading..."
                      ) : (
                        <>
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {parseFloat(hotel.price * priceRate).toFixed(2)}
                          <span className="font-normal text-gray-600 text-sm">
                            /night
                          </span>
                        </>
                      )}
                    </p>
                    <Link to={`/hotel/${hotel.id}`}>
                      <button
                        className="btn-gradient px-2.5 py-1 rounded-md"
                        type="button"
                      >
                        View Deails
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
