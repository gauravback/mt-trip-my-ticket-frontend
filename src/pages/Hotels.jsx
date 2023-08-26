import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Hotels = () => {
  const [hotels, setHotels] = useState();
  const fetchHotels = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/hotels/`
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
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
            {/* Card */}
            {hotels.map((hotel) => (
              <div key={hotel.id} className="group relative block bg-black">
                <img
                  alt={hotel.name}
                  src={hotel.images}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />
                <div className="relative p-4 sm:p-6 lg:p-8">
                  <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                    {hotel.city}
                  </p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {hotel.name}
                  </p>
                  <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-lg text-white capitalize">
                        {hotel.amenities?.[0].name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Card End */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
