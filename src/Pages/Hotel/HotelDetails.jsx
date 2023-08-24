import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const Hoteldetails = () => {
  const settings = {
    dots: true,
    arrows: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidsToShow: 1,
    slidesToScroll: 1,
  };

  const { id } = useParams();
  const [hotel, setHotel] = useState();
  const fetchHotelDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/hotels/${id}/`
    );
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setHotel(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  return (
    <div>
      <div className="bg-white">
        {hotel && (
          <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Product */}
            <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
              {/* Product image */}
              <div className="lg:col-span-4 lg:row-end-1">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                  <Slider {...settings}>
                    <div>
                      <img
                        src={hotel.image}
                        alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles."
                        className="object-cover object-center w-full h-[23rem]"
                      />
                    </div>
                    {hotel.hotel_images.map((image) => (
                      <div key={image}>
                        <img
                          src={image}
                          alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles."
                          className="object-cover object-center w-full h-[23rem]"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              {/* Product details */}
              <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                <div className="flex flex-col-reverse">
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {hotel.name}
                    </h1>
                    <p className="mt-2 text-gray-700 font-semibold">
                      Address : {hotel.address}
                    </p>
                    <p className="mt-2 text-gray-700 font-semibold">
                      City : {hotel.city}, {hotel.pin}
                    </p>
                    <p className="mt-2 text-gray-700 font-semibold">
                      Country : {hotel.country}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-gray-700 text-lg font-bold">
                  Amenities -
                </p>{" "}
                <div className="prose prose-sm text-gray-500 pl-4">
                  <ul role="list">
                    {hotel.amenities.map((amenity) => (
                      <li className="list-disc" key={amenity.id}>
                        {amenity.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Book Now &#8377; {hotel.price}
                  </button>
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-lg font-bold text-gray-900">
                    Other Details
                  </h3>
                  <div className="prose prose-sm mt-4 text-gray-700 font-semibold">
                    <ul role="list">
                      <li className="list-disc">
                        Hotel Rating : {hotel.star_category} stars
                      </li>
                      <li className="list-disc">
                        Available Rooms : {hotel.available_rooms}
                      </li>
                      <li className="list-disc">
                        Contact :{" "}
                        <a href={`tel:${hotel.phone_number}`}>
                          {hotel.phone_number}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hoteldetails;
