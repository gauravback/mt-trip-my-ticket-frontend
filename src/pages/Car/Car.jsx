import api from "@/api/api";
import CarFilter from "@/components/SearchComponents/CarFilter/CarFilter";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbArmchair, TbWindmill } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState();
  const [carType, setCarType] = useState("Sedan");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [Ac, setAc] = useState();
  const [Bags, setBags] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchCars = async () => {
    try {
      const res = await api.get(
        `/api/cars/?car_type=${carType ? carType : ""}&fuel_type=${
          fuelType ? fuelType : ""
        }&seats_min=&seats_max=&transmission=${
          transmission ? transmission : ""
        }&ac=${Ac === null ? "" : Ac}&bags=${
          Bags === null ? "" : Bags
        }&price_min=&price_max=&origin_city=${
          origin ? origin : ""
        }&destination_city=${
          destination ? destination : ""
        }&available_till_after=${
          departure ? departure : ""
        }&available_till_before=`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setCars(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    if (searchParams.size > 0 && origin && destination) {
      fetchCars();
    }
  }, [location.search, carType, fuelType, transmission, Ac, Bags]);

  const [carsData, setCarsData] = useState();
  const fetchCarData = async () => {
    try {
      const res = await api.get("/api/cars/");
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setCarsData(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);
  return (
    <div>
      <div className="">
        <CarFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto hidden md:block">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              {/* Car Type Section */}
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Car Type
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-8 flex-wrap">
                  {[
                    ...new Set(carsData?.map(({ car_type }) => car_type.type)),
                  ].map((uniqueCarType) => (
                    <div className="flex items-center" key={uniqueCarType}>
                      <input
                        type="radio"
                        name="car_type"
                        onChange={() => {
                          setCarType(uniqueCarType);
                        }}
                        defaultChecked={carType === uniqueCarType && true}
                        value={uniqueCarType}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <p className="ml-3 font-medium text-gray-900">
                        {uniqueCarType}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Fuel Type
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-y-8 flex-wrap">
                  {[
                    ...new Set(carsData?.map(({ fuel_type }) => fuel_type)),
                  ].map((fuel_type) => (
                    <div className="flex items-center" key={fuel_type}>
                      <input
                        type="radio"
                        name="fuel_type"
                        onChange={() => {
                          setFuelType(fuel_type);
                        }}
                        value={fuel_type}
                        defaultChecked={fuelType === fuel_type && true}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <p className="ml-3 font-medium text-gray-900">
                        {fuel_type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Transmission
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-y-8 flex-wrap">
                  {[
                    ...new Set(
                      carsData?.map(
                        ({ transmission_type }) => transmission_type
                      )
                    ),
                  ].map((transmission_type) => (
                    <div className="flex items-center" key={transmission_type}>
                      <input
                        type="radio"
                        name="transmission"
                        onChange={() => {
                          setTransmission(transmission_type);
                        }}
                        defaultChecked={
                          transmission === transmission_type && true
                        }
                        value={transmission_type}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <p className="ml-3 font-medium text-gray-900">
                        {transmission_type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Air Conditioner
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setAc(true)}
                      value={true}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setAc(false)}
                      value={false}
                      className="w-full  rounded-md  border-gray-300 border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
              <div>
                <div className="flex space-x-2 text-gray-800">
                  <p className="text-xl lg:leading-6 leading-5 font-medium ">
                    Air Bags
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setBags(true)}
                      className="w-full  border rounded-md border-gray-300 focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                    >
                      Yes
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="text"
                      onClick={() => setBags(false)}
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
            className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[1000] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
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
                {/* Car Type Section */}
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-lg lg:leading-6 leading-5 font-medium ">
                      Car Type
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-1 gap-y-8 flex-wrap">
                    {[
                      ...new Set(
                        carsData?.map(({ car_type }) => car_type.type)
                      ),
                    ].map((uniqueCarType) => (
                      <div className="flex items-center" key={uniqueCarType}>
                        <input
                          type="radio"
                          name="car_type"
                          onChange={() => {
                            setCarType(uniqueCarType);
                          }}
                          defaultChecked={carType === uniqueCarType && true}
                          value={uniqueCarType}
                          className="form-checkbox h-5 w-5 text-sm text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <p className="ml-3 font-medium text-gray-900">
                          {uniqueCarType}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-lg lg:leading-6 leading-5 font-medium ">
                      Fuel Type
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-8 flex-wrap">
                    {[
                      ...new Set(carsData?.map(({ fuel_type }) => fuel_type)),
                    ].map((fuel_type) => (
                      <div className="flex items-center" key={fuel_type}>
                        <input
                          type="radio"
                          name="fuel_type"
                          onChange={() => {
                            setFuelType(fuel_type);
                          }}
                          value={fuel_type}
                          defaultChecked={fuelType === fuel_type && true}
                          className="form-checkbox h-5 w-5 text-indigo-600 text-sm transition duration-150 ease-in-out"
                        />
                        <p className="ml-3 font-medium text-gray-900">
                          {fuel_type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-lg lg:leading-6 leading-5 font-medium ">
                      Transmission
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-8 flex-wrap">
                    {[
                      ...new Set(
                        carsData?.map(
                          ({ transmission_type }) => transmission_type
                        )
                      ),
                    ].map((transmission_type) => (
                      <div
                        className="flex items-center"
                        key={transmission_type}
                      >
                        <input
                          type="radio"
                          name="transmission"
                          onChange={() => {
                            setTransmission(transmission_type);
                          }}
                          defaultChecked={
                            transmission === transmission_type && true
                          }
                          value={transmission_type}
                          className="form-checkbox h-5 w-5 text-indigo-600 text-sm transition duration-150 ease-in-out"
                        />
                        <p className="ml-3 font-medium text-gray-900">
                          {transmission_type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-lg lg:leading-6 leading-5 font-medium ">
                      Air Conditioner
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                    <div className="">
                      <button
                        type="text"
                        onClick={() => setAc(true)}
                        value={true}
                        className="w-full  border rounded-md border-gray-300 text-sm focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        Yes
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => setAc(false)}
                        value={false}
                        className="w-full  rounded-md  border-gray-300 text-sm border focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="bg-gray-200 lg:w-6/12 w-full md:my-6 my-4" />
                <div>
                  <div className="flex space-x-2 text-gray-800">
                    <p className="text-lg lg:leading-6 leading-5 font-medium ">
                      Air Bags
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-3 flex-wrap">
                    <div className="">
                      <button
                        type="text"
                        onClick={() => setBags(true)}
                        className="w-full  border rounded-md border-gray-300 text-sm focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
                      >
                        Yes
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="text"
                        onClick={() => setBags(false)}
                        className="w-full  rounded-md  border-gray-300 border text-sm focus:outline-none focus:ring-0 p-2 transition duration-150 ease-in-out"
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
          <div className="grid grid-cols-1 lg:gap-y-4 gap-6">
            {/* Card */}
            {cars?.map((car) => (
              <div
                key={car.id}
                className="bg-white border flex items-center border-gray-300 rounded-lg overflow-hidden"
              >
                <div className="border h-full hidden  md:flex items-center justify-center bg-white p-4">
                  <img
                    src={car.image}
                    width={250}
                    alt={car.make + " " + car.model}
                    className="rounded-md mix-blend-darken"
                  />
                </div>
                <div className="w-full">
                  <div className="flex">
                    <div className="text-sm mx-2 flex items-center justify-between p-1 rounded text-gray-950 font-bold mt-1 ">
                      <div className="flex items-center space-x-1">
                        <HiOutlineLocationMarker />
                        <span>{car.origin_city}</span>
                      </div>
                      <div className="mx-3">--&gt;</div>
                      <div className="flex items-center space-x-1">
                        <HiOutlineLocationMarker />
                        <span>{car.destination_city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 text-gray-700 md:flex justify-between">
                    <div>
                      <p className="text-xl text-gray-900 font-semibold">
                        {car.make + " " + car.model}{" "}
                        <span className="text-sm">({car.car_type.type})</span>
                      </p>
                    </div>
                    <div className="leading-loose text-sm">
                      <p className="flex items-center md:justify-end space-x-1">
                        <span className="text-xs">Transmission: </span>
                        <span className="font-semibold">
                          {car.transmission_type}
                        </span>
                      </p>
                      <p className="flex items-center md:justify-end space-x-1">
                        <span className="text-xs">Fuel: </span>
                        <span className="font-semibold">{car.fuel_type}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4  text-gray-600">
                    <div className="flex items-center">
                      <p className="flex items-center space-x-1 ">
                        <span className="text-gray-900 font-bold">
                          <TbArmchair fontSize={20} fontWeight={"bold"} />
                        </span>
                        <span className="text-sm font-bold">
                          {car.seats} Seats
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="flex items-center space-x-1 ">
                        <span className="text-gray-900 font-bold">
                          <TbWindmill fontSize={20} fontWeight={"bold"} />
                        </span>
                        <span className="text-sm font-bold">
                          AC: {car.ac ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="flex items-center space-x-1 ">
                        <span className="text-gray-900 font-bold">
                          <svg
                            fill="#000000"
                            height="16"
                            width="16"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 181.43 181.43"
                            xmlSpace="preserve"
                            stroke="#000000"
                            strokeWidth="5.080012000000001"
                            transform="rotate(0)"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke="#CCCCCC"
                              strokeWidth="0.362858"
                            />
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <g>
                                {" "}
                                <path d="M134.045,66.614c-3.707-1.853-8.211-0.35-10.063,3.354l-23.078,46.156H75.92c-2.841,0-5.438,1.605-6.708,4.146 l-25.151,50.302c-1.853,3.705-0.351,8.21,3.354,10.062c1.077,0.539,2.221,0.794,3.348,0.794c2.751,0,5.4-1.52,6.714-4.148 l23.079-46.156h24.985c2.841,0,5.438-1.605,6.708-4.146l25.15-50.302C139.252,72.972,137.75,68.467,134.045,66.614z" />{" "}
                                <path d="M143.162,0.718c-13.832,0-25.045,11.212-25.045,25.044c0,13.831,11.213,25.043,25.045,25.043 c13.831,0,25.043-11.212,25.043-25.043C168.205,11.931,156.993,0.718,143.162,0.718z M143.162,35.806 c-5.539,0-10.045-4.505-10.045-10.043c0-5.538,4.506-10.044,10.045-10.044c5.538,0,10.043,4.506,10.043,10.044 C153.205,31.3,148.7,35.806,143.162,35.806z" />{" "}
                                <path d="M104.121,45.446C104.121,20.387,83.732,0,58.671,0c-25.06,0-45.447,20.387-45.447,45.446 c0,25.061,20.388,45.449,45.447,45.449C83.732,90.895,104.121,70.507,104.121,45.446z M28.224,45.446 C28.224,28.658,41.883,15,58.671,15c16.79,0,30.449,13.658,30.449,30.446c0,16.79-13.66,30.449-30.449,30.449 C41.883,75.895,28.224,62.236,28.224,45.446z" />{" "}
                              </g>{" "}
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm font-bold">
                          Airbags: {car.bags ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1 px-4  text-gray-900">
                    <div className="flex items-center">
                      <p className="flex items-center space-x-1 ">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: currencySymbol,
                          }}
                          className="text-xl"
                        ></span>
                        <span className="text-xl font-bold">
                          {Math.round(car.price * priceRate * 100) / 100}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="flex items-center space-x-1 ">
                        <Link to={`/car/${car.id}`}>
                          <button
                            type="button"
                            className="btn-gradient px-2 p-0.5 rounded-md"
                          >
                            View Details
                          </button>
                        </Link>
                      </p>
                    </div>
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

export default Car;
