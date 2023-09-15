import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Filter from "@/components/SearchComponents/FlightFilter/Filter";
import { IoCopyOutline } from "react-icons/io5";
const Home = () => {
  const [cars, setCars] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchCars = async () => {
    try {
      const response = await api.get("/api/cars/");
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setCars(result);
      } else {
        toast.error("Something went wrong."), { id: 1 };
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong."), { id: 1 };
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,

    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const Cardsettings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      <div className="gradient-bg">
        <Filter />
      </div>

      {/*  Cars  */}
      <div className="px-4 py-8 sm:px-6 lg:px-8 mx-auto w-full bg-yellow-50">
        <div className="max-w-[80rem] mx-auto">
          {/* Grid */}
          <div className="gap-1">
            {/* Card */}
            <Slider {...Cardsettings}>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/abu1.png"
                  alt="Image Description"
                />
                <h1 className="font-medium">City Tours.</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/abu2.png"
                  alt="Image Description"
                />
                <h1 className="font-medium">Dubai Tours</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/abu3.png"
                  alt="Image Description"
                />
                <h1 className="font-medium">Desart Safari</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/abu4.png"
                  alt="Image Description"
                />
                <h1 className="font-medium">Water Parks</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/1.jpg"
                  alt="Image Description"
                />
                <h1 className="font-medium">Luxary Hotels</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/2.jpg"
                  alt="Image Description"
                />
                <h1 className="font-medium">Dinner Cruies</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/3.jpg"
                  alt="Image Description"
                />
                <h1 className="font-medium">Dubai Malls</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/4.jpg"
                  alt="Image Description"
                />
                <h1 className="font-medium">Desert wonder</h1>
              </div>
              <div className="flex flex-col justify-center ">
                <img
                  className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                  src="/5.jpg"
                  alt="Image Description"
                />
                <h1 className="font-medium">Dubai Adventure</h1>
              </div>
            </Slider>

            {/* Card End */}
          </div>
        </div>
        {/* End Grid */}
      </div>
      {/*  Cars  End */}
      {/*  Cars  */}
      <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto w-full">
        <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center space-x-12 w-full">
          <h2 className="text-2xl md:text-4xl md:leading-tight">
            Car <span className="font-bold">Rental</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          {cars?.map((car) => (
            <div className="container mx-auto max-w-sm w-full">
              <div className="card flex flex-col justify-center p-5 bg-white rounded-lg">
                <div className="prod-title">
                  <p className="text-2xl uppercase text-gray-900 font-bold">
                    {car.make} {car.model}
                  </p>
                  <p className="uppercase text-sm text-gray-400">
                    {car.car_type.type}
                  </p>
                </div>
                <div className="prod-img">
                  <img
                    src={car.images}
                    className="w-full object-cover object-center h-42"
                  />
                </div>
                <div className="prod-info grid gap-10">
                  <div>
                    <div className="flex flex-row px-5 items-center mt-4 gap-x-4 justify-center">
                      <div className="flex flex-col items-center rounded-md bg-gray-100 px-4 py-2">
                        <p className="text-xs">Seats</p>
                        <p className="text-sm font-medium text-gray-600">
                          {car.seats}
                        </p>
                      </div>
                      <div className="flex flex-col items-center rounded-md bg-gray-100 px-4 py-2">
                        <p className="text-xs">AC</p>
                        <p className="text-sm font-medium text-gray-600">
                          {car.ac ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="flex flex-col items-center rounded-md bg-gray-100 px-4 py-2">
                        <p className="text-xs">Fuel</p>
                        <p className="text-sm font-medium text-gray-600">
                          {car.fuel_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                    <p className="font-bold text-xl">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: currencySymbol || "",
                        }}
                      />
                      {car.price * priceRate}
                    </p>
                    <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full btn-gradient focus:outline-none">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      {/*  Cars  End */}

      {/* Dubai Delight */}

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl  mb-10 lg:mb-14">
          <h2 className="text-xl font-bold md:text-3xl md:leading-tight">
            Dubai Activity
          </h2>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="gap-x-2 gap-y-1">
          {/* Card */}
          <Slider {...settings} className="sapce-x-1">
            <div className="max-w-[16rem] mx-auto overflow-hidden rounded-lg bg-white shadow-md">
              <img
                className="h-44 w-full rounded-t-lg object-cover"
                src="/abu1.png"
                alt="product image"
              />

              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                  Burj Khalifa At The Top Ticket
                </h5>

                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded px-2.5 py-0.5 text-xs">
                    At The Top ticket allows you to explore the 124th without
                    any time restraint.
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] mx-auto overflow-hidden rounded-lg bg-white shadow-md">
              <img
                className="h-44 w-full rounded-t-lg object-cover"
                src="/abu2.png"
                alt="product image"
              />

              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                  Dubai Aquarium and Underwater Zoo
                </h5>

                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded px-2.5 py-0.5 text-xs">
                    At Wake, our mission has always been focused on bringing
                    openness.
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] mx-auto overflow-hidden rounded-lg bg-white shadow-md">
              <img
                className="h-44 w-full rounded-t-lg object-cover"
                src="/abu3.png"
                alt="product image"
              />

              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                  Dubai Parks and Resorts
                </h5>

                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded px-2.5 py-0.5 text-xs font-semibold">
                    Google is constantly updating its consumer AI, Google
                    Assistant, with new features.
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] mx-auto overflow-hidden rounded-lg bg-white shadow-md">
              <img
                className="h-44 w-full rounded-t-lg object-cover"
                src="/abu4.png"
                alt="product image"
              />

              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                  Ski Dubai Tickets
                </h5>

                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded px-2.5 py-0.5 text-xs font-semibold">
                    Are you an accountant? Are you a company formation advisor?
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] mx-auto overflow-hidden rounded-lg bg-white shadow-md">
              <img
                className="h-44 w-full rounded-t-lg object-cover"
                src="/abu1.png"
                alt="product image"
              />

              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">
                  Burj Khalifa At The Top Ticket
                </h5>

                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded px-2.5 py-0.5 text-xs font-semibold">
                    At The Top ticket allows you to explore the 124th without
                    any time restraint.
                  </span>
                </div>
              </div>
            </div>
          </Slider>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* Dubai Delight End */}

      {/* Destinations */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl  mb-10 lg:mb-14">
          <h2 className="text-xl font-bold md:text-3xl md:leading-tight">
            Plan Your Perfect Trip At
          </h2>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1">
          {/* Card */}
          <div className="">
            <div>
              <img
                src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
                className="rounded-xl brightness-75 h-48 w-full"
              />
            </div>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Mumbai, India
            </p>
          </div>
          {/* End Card */}
          {/* Card */}
          <div className="">
            <div>
              <img
                src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
                className="rounded-xl brightness-75 h-48 w-full"
              />
            </div>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Mumbai, India
            </p>
          </div>{" "}
          {/* End Card */}
          {/* Card */}
          <div className="">
            <div>
              <img
                src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
                className="rounded-xl brightness-75 h-48 w-full"
              />
            </div>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Mumbai, India
            </p>
          </div>
          {/* End Card */}
          {/* Card */}
          <div className="">
            <div>
              <img
                src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
                className="rounded-xl brightness-75 h-48 w-full"
              />
            </div>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Mumbai, India
            </p>
          </div>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* Destinations End */}
      {/* Exclusive Deals */}
      <div className="max-w-[85rem] px-4 border-b py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
        <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center justify-between w-full">
          <h2 className="text-2xl md:text-4xl md:leading-tight">
            Exclusive <span className="font-bold">Deals</span>
          </h2>
          <select class="py-2 px-3 pr-9 block w-auto bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:hidden">
            <option>All</option>
          </select>
          <div className="hidden sm:flex justify-end space-x-6">
            <button
              type="button"
              className="font-semibold py-2 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-theme"
            >
              All
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-6 md:ml-0 md:gap-24 md:px-12 mx-auto">
          {/* Card */}
          <div className="mx-4">
            <div className="flex relative w-[90%] md:w-full h-48 border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-44 sm:h-44 w-28 sm:w-28 top-1.5 -left-12 rounded-xl object-cover shadow-xl transition absolute z-1"
              />
              <div className="p-4 pl-20 w-full flex flex-col gap-y-2">
                <div className="flex items-center justify-end">
                  <div class="flex justify-end  items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    ABC123
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </div>
                <div>
                  <p className="w-full text-xs text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="flex  justify-between">
                  <div className="">
                    <p className="text-[0.6rem] font-normal">Coupon Code</p>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="py-1 bg-transparent w-14 text-gray-500 rounded-md text-xs focus:border-0 focus:outline-none focus:ring-0"
                        defaultValue="ABC123"
                        title="Click to copy"
                        disabled={true}
                      />
                      <button
                        onClick={() => {
                          copyTextToClipboard("AB123");
                        }}
                        type="button"
                        className=""
                      >
                        <IoCopyOutline />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-sm items-self-end font-semibold text-theme"
                    type="button"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Card End */}
          {/* Card */}
          <div className="mx-4">
            <div className="flex relative w-[90%] md:w-full h-48 border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-44 sm:h-44 w-28 sm:w-28 top-1.5 -left-12 rounded-xl object-cover shadow-xl transition absolute z-1"
              />
              <div className="p-4 pl-20 w-full flex flex-col gap-y-2">
                <div className="flex items-center justify-end">
                  <div class="flex justify-end  items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    ABC123
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </div>
                <div>
                  <p className="w-full text-xs text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="flex  justify-between">
                  <div className="">
                    <p className="text-[0.6rem] font-normal">Coupon Code</p>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="py-1 bg-transparent w-14 text-gray-500 rounded-md text-xs focus:border-0 focus:outline-none focus:ring-0"
                        defaultValue="ABC123"
                        title="Click to copy"
                        disabled={true}
                      />
                      <button
                        onClick={() => {
                          copyTextToClipboard("AB123");
                        }}
                        type="button"
                        className=""
                      >
                        <IoCopyOutline />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-sm items-self-end font-semibold text-theme"
                    type="button"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Card End */}
          {/* Card */}
          <div className="mx-4">
            <div className="flex relative w-[90%] md:w-full h-48 border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-44 sm:h-44 w-28 sm:w-28 top-1.5 -left-12 rounded-xl object-cover shadow-xl transition absolute z-1"
              />
              <div className="p-4 pl-20 w-full flex flex-col gap-y-2">
                <div className="flex items-center justify-end">
                  <div class="flex justify-end  items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-red-100 text-red-700">
                    ABC123
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </div>
                <div>
                  <p className="w-full text-xs text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="flex  justify-between">
                  <div className="">
                    <p className="text-[0.6rem] font-normal">Coupon Code</p>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="py-1 bg-transparent w-14 text-gray-500 rounded-md text-xs focus:border-0 focus:outline-none focus:ring-0"
                        defaultValue="ABC123"
                        title="Click to copy"
                        disabled={true}
                      />
                      <button
                        onClick={() => {
                          copyTextToClipboard("AB123");
                        }}
                        type="button"
                        className=""
                      >
                        <IoCopyOutline />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-sm items-self-end font-semibold text-theme"
                    type="button"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      {/* Exclusive Deals End */}
      {/*  Popular Destination  */}
      <div className="bg-gray-100">
        <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto w-full bg-white rounded-md">
          <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center space-x-12 w-full">
            <h2 className="text-2xl md:text-4xl md:leading-tight">
              Popular <span className="font-bold">Destinations</span>
            </h2>
            <select class="py-2 px-3 pr-9 block w-auto bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:hidden">
              <option>All</option>
            </select>
            <div className="hidden sm:flex space-x-6">
              <button
                type="button"
                className="font-semibold inline-flex items-center gap-x-2  border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-theme"
              >
                All
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
            <div className="grid grid-cols-2 gap-x-5">
              <div className="">
                <div>
                  <img
                    src="/flights.jpg"
                    className="rounded-xl brightness-75 h-64 w-full"
                  />
                </div>
                <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
                  Mumbai, India
                </p>
              </div>
              <div className="">
                <div>
                  <img
                    src="/flights.jpg"
                    className="rounded-xl h-64 brightness-75 w-full"
                  />
                </div>
                <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
                  Mumbai, India
                </p>
              </div>
              <div className="">
                <div>
                  <img
                    src="/flights.jpg"
                    className="rounded-xl brightness-75 h-64 w-full"
                  />
                </div>
                <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
                  Mumbai, India
                </p>
              </div>
              <div className="">
                <div>
                  <img
                    src="/flights.jpg"
                    className="rounded-xl brightness-75 h-64 w-full"
                  />
                </div>
                <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
                  Mumbai, India
                </p>
              </div>
            </div>
            {/* End Col */}
            <div className="mt-5 md:mt-0 border rounded-md h-[33rem] overflow-y-scroll">
              <div className="p-4 space-y-3">
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            London, UK
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Mumbai, India
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Delhi, India
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Paris, France
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Rome, Italy
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Canberra, Australia
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Shimla, Himachal Pradesh
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Andaman & Nicobar
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            Los Angeles, USA
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}

                {/* Card */}
                <div className="flex flex-col transition bg-white border rounded-md">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          className="h-14 w-14 rounded-md"
                          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                          alt="Image Description"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">
                            London, UK
                          </h3>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="pl-3">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Card End */}
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/*  Popular Destination  End */}

      {/* Flight And Hotels Cards */}

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Card */}
          <div className="group relative block">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden w-full h-96 before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
              <img
                className="w-full h-full absolute top-0 left-0 object-cover"
                src="/flights.jpg"
                alt="Image Description"
              />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
              <div className="flex flex-col h-full p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-3xl font-semibold text-white">
                  Flights
                </h3>
                <p className="mt-2 text-white/[.8]">
                  Search flights hire to our most popular destinations.
                </p>
                <div className="flex items-center justify-center mt-1">
                  <Link to="/flight">
                    <button className="btn-gradient px-4 py-2 rounded-md inline-flex items-center gap-x-1">
                      <RiSendPlaneFill /> Show Flights
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End Card */}
          {/* Card */}
          <div className="group relative block">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden w-full h-96 before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
              <img
                className="w-full h-full absolute top-0 left-0 object-cover"
                src="/hotels.jpg"
                alt="Image Description"
              />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
              <div className="flex flex-col h-full p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-3xl font-semibold text-white">
                  Hotels
                </h3>
                <p className="mt-2 text-white/[.8]">
                  Search hotels and place hire to our most popular destinations.
                </p>
                <div className="flex items-center justify-center mt-1">
                  <Link to="/hotel">
                    <button className="btn-gradient px-4 py-2 rounded-md inline-flex items-center gap-x-1">
                      <RiSendPlaneFill /> Show Hotels
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>

      {/* Flight And Hotels Cards End */}

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mx-auto divide-y divide-gray-200">
          <div className="py-8 first:pt-0 last:pb-0">
            <div className="space-y-3">
              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">More Links</h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Blog
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Branches
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Bus Tickets
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Travel Advisory
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Domestic Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    International Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Low Cost Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Cheap Flight Booking
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Cheap Air Tickets
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Flight Schedule
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    About Us
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mishandled Baggage Report
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Partner With Us
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    FAQs
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Legal
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Careers
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Retrieve Booking
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    News & Events
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Partner Login
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    IRCTC Agent
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Download our Mobile App
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  International Flight
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Delhi Dubai Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi Bangkok Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi Toronto Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai Dubai Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi Singapore Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi London Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi Kathmandu Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai London Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Chennai Singapore Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai Singapore Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Delhi Newyork Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Kolkata Bangkok Flights
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  Domestic Flight
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Pune Bangalore Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Chennai Delhi Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Bangalore Chennai Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai Delhi Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Bangalore Hyderabad Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Ahmedabad Goa Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai Kolkata Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Hyderabad Delhi Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Bangalore Goa Flights
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mumbai Goa Flights
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  International Airlines
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Emirates Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Oman Air Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Air India Express Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Tiger Airways
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Kuwait Airways
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Air Arabia Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Etihad Airways
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Srilankan Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Air Asia India Airlines
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  Domestic Airlines
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Indigo Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Spicejet Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Air India Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Go Air Airlines
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Air Costa Airlines
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">Hotels</h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Abu Dhabi
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Agra
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Ajmer
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Alibaug
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Alleppey
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Alwar
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Ambala
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Amritsar
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Anjuna Beach
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Baga Beach
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Bengaluru
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Bikaner
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Bilaspur
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Candolim Beach
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Chail
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Chennai
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Dubai
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Fort Kochi
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Gulmarg
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Gurugram
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Hampi
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Havelock
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Hyderabad
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Jaipur
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Kanyakumari
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Kochi
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Kodaikanal
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Kovalam
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Kullu
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Leh
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Lonavala
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Lucknow
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Mahabalipuram
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Manali
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Mangalore
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Mount Abu
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Munnar
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Mysore
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Nashik
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in New Delhi
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Ooty
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Pahalgam
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Pondicherry
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Pune
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Secunderabad
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Sharjah
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Shimla
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Sinquerim Beach
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Thane
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Thekkady
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Tirupati
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Trivandrum
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Udaipur
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Vagator Beach
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Wayanad
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Yercaud
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Best Hotels in Vishakapatanam
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">Visa</h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Dubai Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Singapore Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Malaysia Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Sri Lanka Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Schengen Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    US Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    UK Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    China Visa
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Australia Visa
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  Domestic Tour Packages
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Kashmir Holiday Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Leh Ladakh Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Goa Holidays
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Andaman Holidays
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Kerala Tour Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Himachal packages
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}

              {/* Links */}
              <div className="">
                <h3 className=" font-semibold text-gray-800">
                  International Tour Packages
                </h3>
                <p className="mt-1 inline-flex flex-wrap items-center gap-x-1 text-gray-500 text-sm">
                  <a href="#" className="hover:text-gray-700">
                    Dubai Tour Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Malaysia Tour Package
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Singapore Tour Package
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Thailand Tour Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Bali Packages
                  </a>
                  <a href="#" className="hover:text-gray-700">
                    Srilanka Tour Package
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Europe Tour Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Mauritius Packages
                  </a>{" "}
                  |
                  <a href="#" className="hover:text-gray-700">
                    Maldives Packages
                  </a>{" "}
                  |
                </p>
              </div>
              {/* Links End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
