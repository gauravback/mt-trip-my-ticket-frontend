import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaHotelSolid } from "react-icons/lia";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiBus } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./carousel.css";
const DubaiActivities = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    arrows: true,
  };

  const [images, setImages] = useState();
  const fetchImages = async () => {
    try {
      const response = await api.get("api/banners/");
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setImages(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const [themeParks, setThemeParks] = useState([]);
  const [topAttractions, setTopAttractions] = useState([]);
  const [desertSafaris, setDesertSafaris] = useState([]);
  const [waterParks, setWaterParks] = useState([]);
  const [waterActivities, setWaterActivities] = useState([]);
  const [adventureTours, setAdventureTours] = useState([]);
  const [comboTours, setComboTours] = useState([]);
  const [dubaiActivities, setDubaiActivities] = useState([]);
  const [cityTours, setCityTours] = useState([]);

  const fetchActivities = async (url, setState) => {
    try {
      const response = await api.get(url);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setState(result);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  // List of URLs and their corresponding state setters
  const activityURLs = [
    { url: "/api/theme-parks/", setState: setThemeParks },
    { url: "/api/top-attractions/", setState: setTopAttractions },
    { url: "/api/desert-safaris/", setState: setDesertSafaris },
    { url: "/api/water-parks/", setState: setWaterParks },
    { url: "/api/water-activities/", setState: setWaterActivities },
    { url: "/api/adventure-tours/", setState: setAdventureTours },
    { url: "/api/combo-tours/", setState: setComboTours },
    { url: "/api/dubai-activities/", setState: setDubaiActivities },
    { url: "/api/city-tours/", setState: setCityTours },
  ];

  useEffect(() => {
    activityURLs.forEach(({ url, setState }) => {
      fetchActivities(url, setState);
    });
  }, []);

  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  return (
    <div>
      <div className="">
        <Slider {...settings} className="mx-0 px-0">
          {images?.map((image) => (
            <div>
              <img
                src={image.image}
                className="h-[10rem] md:h-auto"
                width={"100%"}
                height={100}
              />
            </div>
          ))}
        </Slider>
      </div>
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {desertSafaris.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Desert Safaries in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {desertSafaris?.map((safari) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src={safari.image}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        {safari.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <ul className="list-disc mx-1">
                        {safari.inclusions
                          .split(/,|\n/)
                          .slice(0, 3)
                          ?.map((inclusion) => (
                            <li className="mt-2 xl:mt-0 ml-1.5">{inclusion}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        {/* <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            {parseFloat(safari.price * priceRate).toFixed(2)}
                          </span>
                        </p> */}
                        <Link to={`/desert-safari/${safari.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {cityTours.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">City Tours in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {cityTours?.map((cityTour) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src={cityTour.image}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        {cityTour.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <ul className="list-disc mx-1">
                        {cityTour.additional_info
                          .split(/,|\n/)
                          .slice(0, 3)
                          ?.map((inclusion) => (
                            <li className="mt-2 xl:mt-0 ml-1.5">{inclusion}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        {/* <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            {parseFloat(cityTour.price * priceRate).toFixed(2)}
                          </span>
                        </p> */}
                        <Link to={`/city-tour/${cityTour.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dubaiActivities.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Top Activities in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {dubaiActivities?.map((activity) => (
              <div className="mx-auto w-full border border-gray-300 rounded-md">
                <div className="inline-block duration-300 ease-in-out w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src="{activity.image}"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        "activity.name"
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdHiking fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">Activites</span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiAirplaneBold fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.flights.length Flights
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <LiaHotelSolid fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.hotels.length Hotels
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <PiBus fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {" "}
                          activity.buses.length + activity.cars.length Transfers
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          <span className="text-lg">
                            parseFloat(activity.price * priceRate).toFixed(2)
                          </span>
                        </p>
                        <Link to={`/package/${activity.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DubaiActivities;
