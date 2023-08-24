import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState();
  const fetchHotels = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/hotels/`
    );
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setHotels(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  console.log(hotels);

  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl  font-bold text-gray-900">Hotels</h2>
        </div>
        {hotels && (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-1 sm:gap-y-10">
            {/* Card */}
            {hotels.map((hotel) => (
              <Link to={`/hotel/${hotel.id}`} key={hotel.id}>
                <div
                  key={hotel.id}
                  className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    <div className="sm:flex lg:col-span-6">
                      <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="mt-6 sm:mt-0 sm:ml-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {hotel.name}{" "}
                          <p className="text-yellow-600">
                            {" "}
                            ({hotel.star_category} star)
                          </p>
                        </h3>
                        <p className="mt-2 text-2xl font-medium text-gray-900">
                          &#8377; {Math.trunc(hotel.price)}
                        </p>
                        <div className="mt-3 text-gray-700">
                          Available Rooms:
                          <p className="font-semibold text-lg">
                            {hotel.available_rooms}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 lg:col-span-6 lg:mt-0">
                      <div className="grid grid-cols-2 gap-x-6 text-sm">
                        <div>
                          <div className="font-semibold text-xl  text-gray-900">
                            Amenities:
                          </div>
                          <div className="mt-3 text-gray-700">
                            <ul className="pl-5 text-lg">
                              {hotel?.amenities.map((amenity) => (
                                <li
                                  key={amenity.id}
                                  className="list-disc capitalize"
                                >
                                  {amenity.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg  text-gray-900">
                            Address:
                          </div>
                          <div className="mt-3 text-gray-700">
                            <p className="text-lg">{hotel.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-6">
                        <button className="py-2 px-5 rounded-md btn-gradient">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {/* Card End */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
