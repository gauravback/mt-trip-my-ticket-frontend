import api from "@/api/api";
import { showRazorpay } from "@/components/Payment/Payment";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HotelDetails = () => {
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const token = useSelector((state) => state.authReducer?.value?.token);
  const { id } = useParams();
  const [hotelDetails, setHotelDetails] = useState();
  const fetchHotelDetails = async () => {
    try {
      const response = await api.get(`/api/hotels/${id}/`);
      const result = await response.data;
      const status = await response.status;

      if (status === 200) {
        setHotelDetails(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const setImage = (image) => {
    mainImageRef.current.src = image;
  };

  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  console.log(hotelDetails);
  return (
    <div className="mx-auto max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
      {hotelDetails && (
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-4 lg:px-8">
              <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={hotelDetails.image}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid  grid-cols-1 w-full md:grid-cols-2 gap-4">
                {hotelDetails?.hotel_images.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded-lg">
                    <img
                      src={image.image}
                      alt="Model wearing plain black basic tee."
                      className="w-full object-cover object-center h-48"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight capitalize text-gray-900 sm:text-3xl">
                  {hotelDetails?.name}
                </h1>
              </div>
              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  <span
                    dangerouslySetInnerHTML={{ __html: currencySymbol }}
                  ></span>
                  {parseFloat(hotelDetails?.price * priceRate).toFixed(2)}
                </p>
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-gray-900">
                    Amenities
                  </h3>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {hotelDetails.amenities?.map((amenity) => (
                        <li key={amenity.id} className="text-gray-600">
                          <span className="text-gray-600">{amenity.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {hotelDetails?.description}
                    </p>
                  </div>
                </div>
                <div className="mt-10 ">
                  <div className="">
                    <div className="gap-y-3 grid grid-cols-1 md:grid-cols-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Address: </span>{" "}
                          {hotelDetails.address}, {hotelDetails?.city}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Phone Number: </span>{" "}
                          <a
                            className="text-theme"
                            href={`tel:${hotelDetails.phone_number}`}
                          >
                            {hotelDetails.phone_number}
                          </a>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Email Address: </span>{" "}
                          <a
                            className="text-theme"
                            href={`mailto:${hotelDetails.email}`}
                          >
                            {hotelDetails.email}
                          </a>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Available Rooms: </span>{" "}
                          {hotelDetails.available_rooms}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Wifi: </span>{" "}
                          {hotelDetails.wifi_available
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Parking: </span>{" "}
                          {hotelDetails.parking_available
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Rooms */}
          <div className="mt-6 px-8">
            <h1 className="text-2xl font-semibold">Rooms</h1>

            <div
              id="room-grid"
              className="grid lg:grid-cols-1 lg:gap-y-8 gap-10 mt-4"
            >
              {hotelDetails?.rooms.map((room) => (
                <>
                  <div className="py-6 sm:flex border border-gray-200 rounded-md p-4">
                    <div className="md:flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <div className="">
                        <img
                          src={room.image}
                          alt={room.room_type}
                          className="w-full flex-none rounded-md object-cover object-center sm:h-44 sm:w-44"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          <a href="#">{room.room_type}</a>
                        </h3>
                        <p className="truncate text-sm text-gray-500">
                          <span>{room.bed_type}</span>
                        </p>
                        <ul className="mt-6 list-disc grid gap-x-3 gap-y-2 grid-cols-2 w-full px-4">
                          <li class="">
                            <p class="text-base font-medium text-gray-700">
                              {room.bed_type} Bed
                            </p>
                          </li>
                          <li class="">
                            <p class="text-base font-medium text-gray-700">
                              {room.capacity} Person
                            </p>
                          </li>
                          <li class="">
                            <p class="text-base font-medium text-gray-700">
                              {room.view}
                            </p>
                          </li>
                          {room.amenities.map((amenity) => (
                            <li class="">
                              <p class="text-base font-medium text-gray-700">
                                {amenity.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-48 space-y-4 sm:flex-none flex items-end">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center rounded-md border border-transparent py-2 px-2.5 text-sm font-medium btn-gradient shadow-sm focus:outline-none focus:ring-0 sm:w-full sm:flex-grow-0"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                    {/* <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:w-40 sm:flex-none">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent py-2 px-2.5 text-sm font-medium btn-gradient shadow-sm focus:outline-none focus:ring-0 sm:w-full sm:flex-grow-0"
                      >
                        Book Now
                      </button>
                    </div> */}
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* Rooms End */}
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
