import api from "@/api/api";
import { showRazorpay } from "@/components/Payment/Payment";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HotelDetails = () => {
  const mainImageRef = useRef();
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

  return (
    <div className="mx-auto max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
      {hotelDetails && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
              <div className="lg:col-span-3 lg:row-end-1">
                <div className="lg:flex lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div className="max-w-xl overflow-hidden rounded-lg">
                      <img
                        ref={mainImageRef}
                        className="h-96 w-full max-w-full object-cover"
                        src={hotelDetails.image}
                        alt={hotelDetails.name}
                      />
                    </div>
                  </div>
                  <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row items-start lg:flex-col gap-x-2">
                      <button
                        type="button"
                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg hover:border-2 hover:border-amber-600 border-spacing-8 text-center"
                      >
                        <img
                          onClick={() => {
                            setImage(hotelDetails.image);
                          }}
                          className="h-full w-full object-cover"
                          src={hotelDetails.image}
                          alt={hotelDetails.name}
                        />
                      </button>
                      {hotelDetails?.hotel_images?.map((image) => (
                        <button
                          key={image.id}
                          type="button"
                          className="flex-0 aspect-square mb-3 h-20 overflow-hidden hover:border-2 hover:border-amber-600 border-spacing-8 rounded-lg text-center"
                        >
                          <img
                            onClick={() => {
                              setImage(image.image);
                            }}
                            className="h-full w-full object-cover"
                            src={image.image}
                            alt={hotelDetails.name}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                  {hotelDetails.name}
                </h1>
                <div className="mt-5 flex items-center">
                  <div className="flex items-center">
                    {[...Array(hotelDetails.star_category)].map((_, index) => (
                      <svg
                        key={index}
                        className="block h-6 w-6 align-middle text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 font-medium text-gray-500">
                    {hotelDetails.star_category} Stars
                  </p>
                </div>
                <p className="mt-4 text-sm">
                  <span className="text-lg font-medium">Address:</span> <br />
                  {hotelDetails.address}, {hotelDetails.city},{" "}
                  {hotelDetails.state}, {hotelDetails.country},{" "}
                  {hotelDetails.pin}
                </p>
                <p className="mt-4">
                  <span className="text-lg font-medium">Contact:</span> <br />
                  <span className="text-sm font-medium">
                    Phone Number:
                  </span>{" "}
                  <a href={`tel:${hotelDetails.phone_number}`}>
                    {hotelDetails.phone_number}
                  </a>{" "}
                  <br />
                  <span className="text-sm font-medium">Email:</span>{" "}
                  <a href={`mailto:${hotelDetails.email}`}>
                    {hotelDetails.email}
                  </a>{" "}
                  <br />
                </p>
                <p className="mt-4">
                  <span className="font-medium">Total Rooms:</span>{" "}
                  {hotelDetails.total_rooms} <br />
                </p>
                <p className="mt-4">
                  <span className="font-medium">Available Rooms:</span>{" "}
                  {hotelDetails.available_rooms} <br />
                </p>
                <p className="mt-4">
                  <span className="font-medium">Tax:</span>{" "}
                  {Math.trunc(hotelDetails.tax_percent)}% <br />
                </p>

                <div className="mr-2 mt-4 flex items-center space-x-4">
                  <h1 className="font-medium">Rooms</h1>
                  <div className="inline-flex rounded-md ">
                    <button
                      type="button"
                      onClick={() => {
                        if (rooms > 1) {
                          setRooms(rooms - 1);
                        }
                      }}
                      className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                    >
                      {rooms}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRooms(rooms + 1);
                      }}
                      className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="promoCode"
                    className="block text-sm font-medium mt-4 mb-2 dark:text-white"
                  >
                    Promo Code (Optional)
                  </label>
                  <div className="">
                    <input
                      type="text"
                      defaultValue={promoCode}
                      id="promoCode"
                      name="promoCode"
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                      }}
                      className="py-3 px-4 block w-full lg:w-1/2 border border-gray-400 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                  <div className="flex items-end">
                    <h1 className="text-3xl font-bold">
                      &#8377;{hotelDetails.price * rooms}
                    </h1>
                  </div>
                  <button
                    onClick={() => {
                      showRazorpay(
                        token,
                        "hotel",
                        hotelDetails.id,
                        promoCode,
                        rooms
                      );
                    }}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent btn-gradient px-12 py-3 text-center text-base font-bold  transition-all duration-200 ease-in-out focus:shadow"
                  >
                    Book Now
                  </button>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="">
                  <h1 className="text-3xl font-bold">Amenities</h1>
                  <ul className="mt-4 list-disc capitalize">
                    {hotelDetails?.amenities?.map((amenity) => (
                      <li key={amenity.id}>{amenity.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HotelDetails;
