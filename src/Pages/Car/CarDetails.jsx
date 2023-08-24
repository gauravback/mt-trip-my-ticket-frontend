import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState();
  const fetchCarDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/cars/${id}/`
    );
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setCar(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);
  console.log(car);
  return (
    <div>
      {car && (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <figure>
            <img
              className="w-full object-contain object-center rounded-xl h-[30rem]"
              src={car.images}
              alt="Image Description"
            />
          </figure>

          <div className="mt-5 lg:mt-16">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
              {car.make} {car.model}
            </h2>
            <div className=" flex w-full items-center justify-between">
              <p className="mt-2 md:mt-4 text-gray-700 text-2xl md:text-3xl font-semibold">
                Type: {car.car_type.type}
              </p>
              <p className="mt-2 md:mt-4 text-red-500 text-2xl md:text-3xl font-semibold">
                Rent: &#8377; {car.price} / Day
              </p>
              <button className="text-white bg-red-600 py-3 px-5 rounded-lg mt-4 text-xl">
                Book Now
              </button>
            </div>

            {/* Grid */}
            <div className=" mt-5 grid md:grid-cols-4 border border-gray-200 shadow-sm rounded-xl overflow-hidden">
              {/* Card */}
              <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 before:absolute before:top-0 before:left-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent ">
                <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                  <div className="grow">
                    <p className="uppercase tracking-wide font-bold text-gray-800">
                      Passengers Capability
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-red-600">
                      {car.passengers}
                    </h3>
                  </div>
                </div>
              </div>
              {/* End Card */}
              {/* Card */}
              <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 before:absolute before:top-0 before:left-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent ">
                <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                  <div className="grow">
                    <p className="uppercase tracking-wide font-bold text-gray-800">
                      Transmission
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-red-600">
                      {car.transmission}
                    </h3>
                  </div>
                </div>
              </div>
              {/* End Card */}
              {/* Card */}
              <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 before:absolute before:top-0 before:left-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent ">
                <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                  <div className="grow">
                    <p className="uppercase tracking-wide font-bold text-gray-800">
                      AC Available
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-red-600">
                      {car.ac ? "Yes" : "No"}
                    </h3>
                  </div>
                </div>
              </div>
              {/* End Card */}
              {/* Card */}
              <div className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 before:absolute before:top-0 before:left-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent ">
                <div className="flex md:grid lg:flex gap-y-3 gap-x-5">
                  <div className="grow">
                    <p className="uppercase tracking-wide font-bold text-gray-800">
                      Air Bags
                    </p>
                    <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-red-600">
                      {car.bags ? "Yes" : "No"}
                    </h3>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </div>
            {/* End Grid */}
          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetails;
