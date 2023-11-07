import api from "@/api/api";
import Loader from "@/components/Loader/Loader";
import CarFilter from "@/components/SearchComponents/CarFilter/CarFilter";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { TbArmchair, TbWindmill } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Car = () => {
  const [cars, setCars] = useState();
  const [carType, setCarType] = useState("");
  const [Ac, setAc] = useState();
  const [Bags, setBags] = useState();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const car_type = searchParams.get("category");

  const fetchCars = async () => {
    try {
      const res = await api.get(
        `/api/cars/?car_type=${
          carType ? carType : ""
        }&seats_min=&seats_max=&ac=${Ac === null ? "" : Ac}&bags=${
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
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (car_type) {
      setCarType(car_type);
    }
    fetchCars();
  }, [location.search, carType, Ac, Bags]);

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
          {!loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-y-4 gap-6 place-items-center">
              {/* Card */}
              {cars.length > 0 ? (
                cars
                  ?.filter((car) => car.available_cars > 0)
                  ?.map((car) => (
                    <div key={car.id} className="max-w-sm w-full py-6 px-3">
                      <div className="bg-white shadow border rounded-lg overflow-hidden">
                        <div
                          className="bg-cover bg-center h-56 p-4"
                          style={{
                            backgroundImage: `url(${car.image})`,
                          }}
                        ></div>
                        <div className="p-4">
                          <p
                            title={car.name}
                            className="truncate uppercase tracking-wide  font-bold text-gray-700"
                          >
                            {car.name}
                          </p>
                          <span className="text-gray-500 font-semibold">
                            {car.car_type.type}
                          </span>
                        </div>
                        <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                          <a
                            href={`https://api.whatsapp.com/send?phone=+919804480448&text=${car.name}`}
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
                          <Link to={`/car/${car.id}`} className="w-full">
                            <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                              <CgDetailsMore fontSize={28} />
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h1 className="text-xl font-medium text-center">
                  No Cars Available
                </h1>
              )}

              {/* End Card */}
            </div>
          ) : (
            <div className="py-24">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car;
