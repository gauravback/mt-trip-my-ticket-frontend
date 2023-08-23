import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Flights = () => {
  const [flights, setFlights] = useState();
  const fetchFlights = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/flights/`
    );
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setFlights(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  console.log(flights);

  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl  font-bold text-gray-900">Flights</h2>
        </div>
        {flights && (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
            {/* Card */}
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="flex bg-white transition hover:shadow-xl"
              >
                <div className="hidden sm:block sm:basis-56">
                  <img
                    alt="Guitar"
                    src={flight.image}
                    className="aspect-square h-full w-full object-fit"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <h3 className="font-bold uppercase text-gray-900">
                      {flight.name}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Recusandae dolores, possimus pariatur animi temporibus
                      nesciunt praesentium dolore sed nulla ipsum eveniet
                      corporis quidem, mollitia itaque minus soluta, voluptates
                      neque explicabo tempora nisi culpa eius atque dignissimos.
                      Molestias explicabo corporis voluptatem?
                    </p>
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

export default Flights;
