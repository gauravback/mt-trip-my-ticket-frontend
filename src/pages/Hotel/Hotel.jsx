import api from "@/api/api";
import Filter from "@/components/SearchComponents/HotelFilter/Filter";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hotel = () => {
  const [hotels, setHotels] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchHotels = async () => {
    try {
      const res = await api.get("/api/hotels/");
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setHotels(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  console.log(hotels);

  const sliceUntilSecondPeriod = (input) => {
    const firstPeriodIndex = input.indexOf(".");
    if (firstPeriodIndex !== -1) {
      const secondPeriodIndex = input.indexOf(".", firstPeriodIndex + 1);
      if (secondPeriodIndex !== -1) {
        return input.slice(0, secondPeriodIndex + 1);
      }
    }
    return input;
  };
  return (
    <div>
      <div className="bg-prime">
        <Filter />
      </div>
      <div className="flex w-full flex-wrap">
        <div className="w-full md:w-1/3">
          <div className="2xl:container 2xl:mx-auto">
            <div
              id="filterSection"
              className="block md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full"
            >
              {/* Material Section */}
              <div>
                <div className="flex space-x-2 text-gray-800 dark:text-white">
                  <img
                    className="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4.svg"
                    alt="materials"
                  />
                  <img
                    className="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg4dark.svg"
                    alt="materials"
                  />
                  <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">
                    Material
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-8 flex-wrap">
                  <div className="flex items-center gap-x-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      id="Leather"
                      name="Leather"
                      defaultValue="Leather"
                    />
                    <div className="inline-block">
                      <div className="flex ">
                        <label
                          className="mr-2 text-sm leading-3 font-normal text-gray-600"
                          htmlFor="Leather"
                        >
                          Leather
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

              {/* Apply Filter Button (Large Screen) */}
              <div className="hidden w-full md:block mt-7">
                <button className=" w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4 ">
                  Apply Filter
                </button>
              </div>
              {/* Apply Filter Button (Table or lower Screen) */}
              <div className="block md:hidden w-full mt-10">
                <button
                  onclick="applyFilters()"
                  className="w-full btn-gradient focus:ring-0 focus:outline-none text-base rounded-md font-medium py-2 px-4"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-3 w-full">
          <div className="grid grid-cols-1 e-full lg:gap-y-4 gap-6">
            {/* Card */}
            {hotels?.map((hotel) => (
              <div
                key={hotel.id}
                className="flex w-full flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-4xl mx-auto border  bg-white"
              >
                <div className="w-full md:w-1/5 bg-white grid place-items-center">
                  <img
                    src={hotel.image}
                    alt="tailwind logo"
                    className="rounded-xl h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-4/5 bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="text-gray-500 text-sm font-medium hidden md:block">
                      {hotel.city}
                    </p>
                    <div className="flex items-center">
                      {Array.from(
                        { length: hotel.star_category },
                        (_, index) => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )
                      )}

                      <p className="text-gray-600 font-bold text-xs ml-1">
                        {hotel.star_category} Stars
                      </p>
                    </div>
                  </div>
                  <h3 className="font-black text-gray-800 md:text-xl text-base">
                    {hotel.name}
                  </h3>
                  <p className="md:text-base text-gray-500 text-sm">
                    {sliceUntilSecondPeriod(hotel.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-gray-800">
                      <span
                        dangerouslySetInnerHTML={{ __html: currencySymbol }}
                      ></span>
                      {hotel.price}
                      <span className="font-normal text-gray-600 text-sm">
                        /night
                      </span>
                    </p>
                    <Link to={`/hotel/${hotel.id}`}>
                      <button
                        className="btn-gradient px-2.5 py-1 rounded-md"
                        type="button"
                      >
                        View Deails
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
