import api from "@/api/api";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaHotelSolid } from "react-icons/lia";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiAirplaneDuotone, PiBus } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const fetchPackageDetails = async () => {
    try {
      const response = await api.get(`/api/packages/${id}`);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setPackageDetails(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };
  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  return (
    <div>
      {packageDetails && (
        <section className="py-20 font-poppins dark:bg-gray-800">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="sticky top-0 z-50 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 ">
                    <img
                      className="object-cover w-full lg:h-1/2 rounded-md h-96"
                      src={packageDetails.image}
                      alt
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6 ">
                    <h2 className="max-w-xl mt-2 mb-4 text-3xl font-bold md:text-4xl font-heading">
                      {packageDetails.name}
                    </h2>
                    <p className="max-w-md flex items-center mb-4 text-2xl font-semibold text-gray-500">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: currencySymbol,
                        }}
                      ></span>
                      <span>
                        {parseFloat(packageDetails.price * priceRate).toFixed(
                          2
                        )}
                      </span>
                    </p>
                  </div>
                  <div className>
                    <p className="mb-4 text-lg font-semibold">
                      Duration : {packageDetails.duration}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-gray-300 lg:grid-cols-3 ">
                      <div>
                        <button className="flex items-center  w-full h-full py-4   hover:border-blue-400">
                          <div>
                            <div className="mx-auto  inline-flex items-center justify-center rounded-full font-semibold">
                              <PiAirplaneBold fontSize={28} />
                            </div>
                            <p className="text-lg text-center text-gray-700">
                              {packageDetails.flights.length} Flights
                            </p>
                          </div>
                        </button>
                      </div>

                      <div>
                        <button className="flex items-center  w-full h-full py-4   hover:border-blue-400">
                          <div>
                            <div className="mx-auto  inline-flex items-center justify-center rounded-full font-semibold">
                              <LiaHotelSolid fontSize={32} />
                            </div>
                            <p className="text-lg text-center text-gray-700">
                              {packageDetails.hotels.length} Hotels
                            </p>
                          </div>
                        </button>
                      </div>
                      <div>
                        <button className="flex items-center w-full h-full py-4   hover:border-blue-400">
                          <div>
                            <div className="mx-auto  inline-flex items-center justify-center rounded-full font-semibold">
                              <PiBus fontSize={32} />
                            </div>
                            <p className="text-lg text-center text-gray-700">
                              {packageDetails.cars.length +
                                packageDetails.buses.length}{" "}
                              Transfers
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 ">
                    <div className="flex flex-wrap items-center">
                      <span className="mr-2">
                        <MdHiking fontSize={24} />
                      </span>
                      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                        Activities
                      </h2>
                    </div>
                    <ul className="px-12 list-disc">
                      {packageDetails.activities
                        .split(/,|\n/)
                        .map((activity, index) => {
                          return (
                            <li className="my-3" key={index}>
                              {activity}
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  <div className="mt-6 ">
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: packageDetails.id,
                            type: "package",
                            price: packageDetails.price,
                            maxDate: packageDetails.departure,
                          })
                        );
                        navigate("/checkout");
                      }}
                      className="w-full px-4 py-2 font-bold rounded-md  lg:w-96 btn-gradient"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PackageDetails;
