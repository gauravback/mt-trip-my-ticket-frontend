import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "@/api/api";
import toast from "react-hot-toast";
import Filter from "@/components/FlightFilter/Filter";
import Offers from "@/components/Offers/Offers";
const Home = () => {
  const [cars, setCars] = useState();

  const getCars = async () => {
    const response = await api.get("/api/cars/");
    var result = await response.data;
    const status = await response.status;
    if (status === 200) {
      setCars(result);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="">
      <main>
        <div style={{ backgroundImage: `url("/bg2.jpg")` }}>
          <Filter />
        </div>
        <section
          aria-labelledby="collections-heading"
          className="mt-12 max-w-[85rem] md:max-w-[80%] mx-auto"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {cars && (
              <div className="mx-auto lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-2.5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-4">
                  {cars.map((car) => (
                    <div key={car.id}>
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden border rounded-lg">
                          <img
                            src={car.images}
                            alt={`${car.make} ${car.model}`}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {car.make} {car.model}
                          </h3>
                          <p className="mt-1 text-sm text-gray-700">
                            Seats: {car.seats}
                          </p>
                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">
                            &#8377; {car.price} / Day
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/*  */}
                </div>
              </div>
            )}
            <Offers />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
