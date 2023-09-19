import api from "@/api/api";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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

  console.log(carDetails);
  const changeImage = (image) => {
    mainImageRef.current.src = image;
  };

  return (
    <div>
      {carDetails && (
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
                              src={image.image}
                              alt={`${carDetails.make} ${carDetails.model}`}
                              onClick={() => {
                                changeImage(image.image);
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
                    {carDetails?.make} {carDetails.model}
                  </h1>
                  <div className="flex items-center justify-between  max-w-lg text-gray-800 rounded-md">
                    {/* Card */}
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
                    {/* Card end */}

                    <div className="text-sm md:text-xl flex items-center">
                      ---&gt;
                    </div>
                    {/* Card */}
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
                    {/* Card end */}
                  </div>
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
                        {/* Card end */}
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Transmission</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl capitalize">
                              {carDetails.transmission_type}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Fuel</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl capitalize">
                              {carDetails.fuel_type}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>AC</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl">
                              {carDetails.ac ? "Yes" : "No"}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
                        <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md border border-gray-300 font-heading">
                          <span>Air Bags</span>
                          <span className="flex items-center">
                            <span className="ml-3 mr-1 text-sm"></span>
                            <span className="text-xl">
                              {carDetails.bags ? "Yes" : "No"}
                            </span>
                          </span>
                        </div>
                        {/* Card end */}
                        {/* Card */}
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
                        <div className="md:col-span-2 flex items-center justify-end">
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
                        </div>
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CarDetails;
