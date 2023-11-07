import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgDetailsMore } from "react-icons/cg";
import { LiaHotelSolid } from "react-icons/lia";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiBus } from "react-icons/pi";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
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
  const [sightSeeing, setSightSeeing] = useState([]);
  const [dhowCruiseDubai, setDhowCruiseDubai] = useState([]);
  const [glampingTours, setGlampingTours] = useState([]);
  const [burjKhalifaTours, setBurjKhalifaTours] = useState([]);
  const [skyAdventures, setSkyAdventures] = useState([]);

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
    { url: "/api/sightseeing/", setState: setSightSeeing },
    { url: "/api/dhowcruisedubai/", setState: setDhowCruiseDubai },
    { url: "/api/glampingtours/", setState: setGlampingTours },
    { url: "/api/burjkhalifatours/", setState: setBurjKhalifaTours },
    { url: "/api/skyadventures/", setState: setSkyAdventures },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {desertSafaris?.map((safari) => (
              <div key={safari.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${safari.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={safari.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {safari.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${safari.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link to={`/desert-safari/${safari.id}`} className="w-full">
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {cityTours?.map((cityTour) => (
              <div key={cityTour.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${cityTour.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={cityTour.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {cityTour.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${cityTour.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link to={`/city-tour/${cityTour.id}`} className="w-full">
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {sightSeeing.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Sight Seeing Tours</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {sightSeeing?.map((sightseeing) => (
              <div key={sightseeing.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${sightseeing.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={sightseeing.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {sightseeing.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${sightseeing.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link
                      to={`/sightseeing/${sightseeing.id}`}
                      className="w-full"
                    >
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {dhowCruiseDubai.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Dhow Cruise in Dubai</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {dhowCruiseDubai?.map((dhowCruise) => (
              <div key={dhowCruise.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${dhowCruise.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={dhowCruise.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {dhowCruise.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${dhowCruise.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link
                      to={`/dhowcruise/${dhowCruise.id}`}
                      className="w-full"
                    >
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {glampingTours.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Glamping Tours</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {glampingTours?.map((glampingTour) => (
              <div key={glampingTour.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${glampingTour.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={glampingTour.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {glampingTour.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${glampingTour.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link
                      to={`/glamping-tour/${glampingTour.id}`}
                      className="w-full"
                    >
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {burjKhalifaTours.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Burj Khalifa Tours</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {burjKhalifaTours?.map((burjKhalifaTour) => (
              <div
                key={burjKhalifaTour.id}
                className="max-w-sm w-full py-6 px-3"
              >
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${burjKhalifaTour.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={burjKhalifaTour.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {burjKhalifaTour.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${burjKhalifaTour.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link
                      to={`/burj-khalifa-tour/${burjKhalifaTour.id}`}
                      className="w-full"
                    >
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {skyAdventures.length > 0 && (
        <div className="mt-12 mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-2xl font-bold mb-5">Sky Adventures</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
            {skyAdventures?.map((skyAdventure) => (
              <div key={skyAdventure.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${skyAdventure.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={skyAdventure.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {skyAdventure.name}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${skyAdventure.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link
                      to={`/sky-adventure/${skyAdventure.id}`}
                      className="w-full"
                    >
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
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
