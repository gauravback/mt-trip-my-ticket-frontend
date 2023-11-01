import api from "@/api/api";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import BackButton from "@/components/Button/BackButton";
import Loader from "@/components/Loader/Loader";
import Reviews from "@/components/Reviews/Reviews";
import { TbArmchair, TbWindmill } from "react-icons/tb";

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchCarDetails = async () => {
    try {
      const response = await api.get(`/api/cars/${id}`);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setCarDetails(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };
  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const mainImageRef = useRef();

  const changeImage = (image) => {
    mainImageRef.current.src = image;
  };

  const [cars, setCars] = useState();

  const fetchCars = async () => {
    try {
      const response = await api.get("/api/cars/");
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setCars(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
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

  return (
    <div>
      <BackButton />

      {carDetails ? (
        <section className="py-10 font-poppins dark:bg-gray-800">
          <div className="max-w-7xl px-4 mx-auto">
            <div className="">
              <div className="">
                <div className="">
                  <div className="">
                    <div className="">
                      <div className="max-w-3xl overflow-hidden mx-auto rounded-lg">
                        <img
                          className="h-[30rem] w-full mx-auto max-w-full object-contain rounded-md"
                          src={carDetails?.image}
                          alt={`${carDetails.make} ${carDetails.model}`}
                          ref={mainImageRef}
                        />
                      </div>
                    </div>
                    <div className="mt-2 w-full">
                      <div className="flex flex-row items-start space-x-4 justify-center">
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                        >
                          <img
                            className="h-full w-full object-cover"
                            src={carDetails.image}
                            alt={`${carDetails.make} ${carDetails.model}`}
                            onClick={() => {
                              changeImage(carDetails.image);
                            }}
                          />
                        </button>
                        {carDetails?.car_images?.map((image) => (
                          <button
                            type="button"
                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                          >
                            <img
                              className="h-full w-full object-cover"
                              src={`${import.meta.env.VITE_APP_API_URL}${
                                image.image
                              }`}
                              alt={`${carDetails.make} ${carDetails.model}`}
                              onClick={() => {
                                changeImage(
                                  `${import.meta.env.VITE_APP_API_URL}${
                                    image.image
                                  }`
                                );
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-2xl px-4 pt-10  sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pt-16">
                <div className="lg:col-span-2 md:flex items-center justify-between lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight capitalize text-gray-900 sm:text-3xl">
                    {carDetails?.name}
                  </h1>
                  {/* <div className="flex items-center justify-between  max-w-lg text-gray-800 rounded-md">
                 
                    <div className="flex items-center justify-center  py-3 font-medium leading-8  rounded-md font-heading">
                      <span className="flex items-center  justify-center">
                        <span className="ml-3 mr-1">
                          <HiOutlineLocationMarker fontSize={28} />
                        </span>
                        <span className="text-base md:text-xl">
                          {carDetails.origin_city}
                        </span>
                      </span>
                    </div>
               

                    <div className="text-sm md:text-xl flex items-center">
                      ---&gt;
                    </div>
                  
                    <div className="flex items-center justify-center py-3 font-medium leading-8  rounded-md font-heading">
                      <span className="flex items-center justify-center">
                        <span className="ml-3 mr-1">
                          <HiOutlineLocationMarker fontSize={28} />
                        </span>
                        <span className="text-base md:text-xl">
                          {carDetails.destination_city}
                        </span>
                      </span>
                    </div>
                 
                  </div> */}
                </div>
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-1 lg:pb-16 lg:pr-8">
                  {/* Description and details */}

                  <div className="mt-10 ">
                    <div className="max-w- mx-auto">
                      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Car Type</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl capitalize">
                              {carDetails.car_type.type}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Total Seats</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl capitalize">
                              {carDetails.seats}
                            </span>
                          </span>
                        </div>

                        {/* <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>AC</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl">
                              {carDetails.ac ? "Yes" : "No"}
                            </span>
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Air Bags</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl">
                              {carDetails.bags ? "Yes" : "No"}
                            </span>
                          </span>
                        </div> */}

                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Available Cars</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl">
                              {carDetails.available_cars}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
                        {/* <div className="md:col-span-2 flex items-center justify-end">
                          <div className="flex  items-center justify-end md:pl-10 py-3 font-medium leading-8 bg-white rounded-md  font-heading">
                            <span>Price</span>
                            <span className="flex items-center">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: currencySymbol,
                                }}
                                className="text-2xl ml-3"
                              ></span>
                              <span className="text-3xl">
                                {parseFloat(
                                  carDetails.price * priceRate
                                ).toFixed(2)}
                              </span>
                            </span>
                          </div>
                        </div> */}
                        {/* Card end */}
                      </div>
                      <div className="my-5 flex justify-end items-center">
                        <button
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: carDetails.id,
                                price: carDetails.price,
                                type: "car",
                                maxDate: carDetails.available_till,
                              })
                            );
                            navigate("/checkout");
                          }}
                          className="btn-gradient px-10 rounded-md w-full md:w-auto py-3"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1  lg:gap-y-4 gap-6">
                <Slider {...settings} className="">
                  {cars
                    ?.filter((car) => car.available_cars > 0)
                    ?.map((car) => (
                      <div className="relative mx-auto w-full border rounded-md border-gray-100">
                        <div className="relative inline-block duration-300 ease-in-out transition-transform transform  w-full">
                          <div className="shadow p-4 rounded-lg bg-white">
                            <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                              <div className="transition-transform duration-500 transform ease-in-out  w-full">
                                <img
                                  className="absolute inset-0 bg-black h-56 w-full object-cover"
                                  src={car.image}
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                                {car.make} {car.model}{" "}
                              </h2>
                              <span className="text-sm text-gray-600">
                                {car.car_type.type}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                              <p className="inline-flex flex-row items-center text-gray-800">
                                <TbArmchair fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {" "}
                                  {car.seats} Seats
                                </span>
                              </p>

                              <p
                                title="air-conditioner"
                                className="inline-flex flex-row items-center text-gray-800"
                              >
                                <TbWindmill fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {car.ac ? "Yes" : "No"}
                                </span>
                              </p>
                              <p className="inline-flex flex-row items-center text-gray-800">
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
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {car.bags ? "Yes" : "No"}
                                </span>
                              </p>
                            </div>
                            <div className="mt-8">
                              <div className="flex justify-end items-center">
                                {/* <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                                  <span
                                    className="uppercase"
                                    dangerouslySetInnerHTML={{
                                      __html: currencySymbol,
                                    }}
                                  ></span>
                                  <span className="text-lg">
                                    {parseFloat(car.price * priceRate).toFixed(
                                      2
                                    )}
                                  </span>
                                </p> */}
                                <Link to={`/car/${car.id}`}>
                                  <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap  leading-tight rounded-xl">
                                    View Details
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Reviews
              reviews={carDetails?.reviews}
              packageType="car"
              packageId={carDetails?.id}
              fetchPackage={fetchCarDetails}
            />
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CarDetails;
