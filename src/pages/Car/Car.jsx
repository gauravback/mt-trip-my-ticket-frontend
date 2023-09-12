import api from "@/api/api";
import CarFilter from "@/components/SearchComponents/CarFilter/CarFilter";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbArmchair, TbWindmill } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  console.log(departure);
  const fetchCars = async () => {
    try {
      const res = await api.get(
        `/api/cars/?car_type=&fuel_type=&seats_min=&seats_max=&transmission=&ac=unknown&bags=unknown&price_min=&price_max=&origin_city=${
          origin ? origin : ""
        }&destination_city=${
          destination ? destination : ""
        }&available_till_after=${
          departure ? departure : ""
        }&available_till_before=`
      );
      const data = await res.data;
      console.log(data);
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
  }, [location.search]);

  return (
    <div>
      <div className="bg-prime">
        <CarFilter />
      </div>
      <div className="flex w-full flex-wrap">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              {/* Material Section */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <img
                    className="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4.svg"
                    alt="materials"
                  />
                  <img
                    className="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4dark.svg"
                    alt="materials"
                  />
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Material
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-8 flex-wrap">
                  <div className="flex items-center gap-x-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      id="Leather"
                      name="Leather"
                      defaultValue="Leather"
                    />
                    <div className="inline-block">
                      <div className="flex ">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          Leather
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* Apply Filter Button (Large Screen) */}
              <div className="hidden w-full md:block mt-7">
                <button className=" w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4 ">
                  Apply Filter
                </button>
              </div>
              {/* Apply Filter Button (Table or lower Screen) */}
              <div className="block md:hidden w-full mt-10">
                <button
                  onclick="applyFilters()"
                  className="w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
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
                    src={car.images}
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
                        <button
                          type="button"
                          className="btn-gradient px-2 p-0.5 rounded-md"
                        >
                          Book Now
                        </button>
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
