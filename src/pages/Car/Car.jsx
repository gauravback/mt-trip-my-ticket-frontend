import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/api";
import Filter from "@/components/CarFilter/CarFilter";
import { useLocation } from "react-router-dom";

export default function Car() {
  const [cars, setCars] = useState();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");

  const fetchCars = async () => {
    const response = await api.get(
      `/api/cars/?origin_city=${origin ? origin : ""}&destination_city=${
        destination ? destination : ""
      }&available_from_before=${departure ? departure : ""}`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      if (result.length > 0) {
        setCars(result);
      } else {
        setMessage("No cars available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      if (origin || destination || departure) {
        fetchCars();
      } else {
        setMessage("No cars available");
      }
    }
  }, [location.search]);

  return (
    <>
      <Filter />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {cars ? (
          <div className="mt-6 grid grid-cols-1 mx-auto gap-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
              >
                <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-6">
                    <div className="w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-48 sm:w-3/5">
                      <img
                        src={car.images}
                        width={300}
                        alt={car.name}
                        className="object-contain object-center"
                      />
                    </div>
                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      <p className="mt-2 text-xl font-medium text-gray-900">
                        &#8377; {Math.trunc(car.price)} / Day
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 lg:col-span-6 lg:mt-0">
                    <div className="grid grid-cols-2 gap-y-8">
                      <div>
                        <div className="font-semibold  text-gray-900">
                          Passengers: {car.passengers}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold  text-gray-900">
                          Transmission: {car.transmission}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold  text-gray-900">
                          AC Avalable: {car.ac ? "Yes" : "No"}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold  text-gray-900">
                          Air Bags: {car.bags ? "Yes" : "No"}
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

              // <div className="flex bg-white transition hover:shadow-xl">
              //   <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
              //     <time
              //       dateTime="2022-10-10"
              //       className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
              //     >
              //       <span>2022</span>
              //       <span className="w-px flex-1 bg-gray-900/10" />
              //       <span>Oct 10</span>
              //     </time>
              //   </div>
              //   <div className="hidden sm:block sm:basis-56">
              //     <img
              //       alt="Guitar"
              //       src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              //       className="aspect-square h-full w-full object-cover"
              //     />
              //   </div>
              //   <div className="flex flex-1 flex-col justify-between">
              //     <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              //       <a href="#">
              //         <h3 className="font-bold uppercase text-gray-900">
              //           Finding the right guitar for your style - 5 tips
              //         </h3>
              //       </a>
              //       <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
              //         Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              //         Recusandae dolores, possimus pariatur animi temporibus
              //         nesciunt praesentium dolore sed nulla ipsum eveniet
              //         corporis quidem, mollitia itaque minus soluta, voluptates
              //         neque explicabo tempora nisi culpa eius atque dignissimos.
              //         Molestias explicabo corporis voluptatem?
              //       </p>
              //     </div>
              //     <div className="sm:flex sm:items-end sm:justify-end">
              //       <a
              //         href="#"
              //         className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
              //       >
              //         Read Blog
              //       </a>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center my-12">
            <h1 className="text-2xl font-semibold">{message ? message : ""}</h1>
          </div>
        )}
      </div>
    </>
  );
}
