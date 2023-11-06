import api from "@/api/api";
import BackButton from "@/components/Button/BackButton";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LiaHotelSolid } from "react-icons/lia";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiBus } from "react-icons/pi";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
  const [packages, setPackages] = useState();

  const fetchPackages = async () => {
    try {
      const res = await api.get(`/api/packages/`);
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setPackages(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchPackages();
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,

    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <BackButton />
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
                    {/* <p className="max-w-md flex items-center mb-4 text-2xl font-semibold text-gray-500">
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
                    </p> */}
                  </div>
                  <div className="">
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
                    {/* <button
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
                    </button> */}
                    <div className="flex items-center w-full space-x-2">
                      <a
                        href={`https://api.whatsapp.com/send?phone=+919804480448&text=${packageDetails.name}`}
                        className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                      >
                        <SiWhatsapp fontSize={24} /> WhatsApp
                      </a>

                      <a
                        href="tel:+919804480448"
                        className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                      >
                        <RiPhoneLine fontSize={24} />
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">You might also like.</h1>
              <div className="grid grid-cols-1  lg:gap-y-4 gap-6">
                {/* Card */}
                <Slider {...settings} className="">
                  {packages
                    ?.filter(
                      (pkg) =>
                        pkg.destination_city === packageDetails.destination_city
                    )
                    ?.map((pkg) => (
                      <div className="relative mx-auto w-full">
                        <div className="relative inline-block duration-300 ease-in-out transition-transform transform  w-full">
                          <div className="shadow p-4 rounded-lg bg-white">
                            <div className="flex justify-center rounded-lg overflow-hidden h-52">
                              <div className=" duration-500 transform ease-in-out  w-full h-full">
                                <img
                                  className="bg-black w-full h-full"
                                  width={"100%"}
                                  height={"100%"}
                                  src={pkg.image}
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                                {pkg.name}
                              </h2>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                <MdHiking fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {" "}
                                  {(pkg.activities.match(/\n/g) || []).length +
                                    1}{" "}
                                  Activites
                                </span>
                              </p>
                              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                <PiAirplaneBold fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {" "}
                                  {pkg.flights.length} Flights
                                </span>
                              </p>
                              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                <LiaHotelSolid fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {" "}
                                  {pkg.hotels.length} Hotels
                                </span>
                              </p>
                              <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                <PiBus fontSize={20} />
                                <span className="mt-2 xl:mt-0 ml-1.5">
                                  {" "}
                                  {pkg.buses.length + pkg.cars.length} Transfers
                                </span>
                              </p>
                            </div>
                            <div className="mt-8">
                              <div className="flex w-full items-center">
                                {/* <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                                  <span
                                    className="uppercase"
                                    dangerouslySetInnerHTML={{
                                      __html: currencySymbol,
                                    }}
                                  ></span>
                                  <span className="text-lg">
                                    {parseFloat(pkg.price * priceRate).toFixed(
                                      2
                                    )}
                                  </span>
                                </p> */}
                                <Link
                                  to={`/package/${pkg.id}`}
                                  className="w-full"
                                >
                                  <button className="inline-block w-full font-semibold text-gradient p-2 whitespace-nowrap hover:border-red-500 leading-tight rounded-xl">
                                    View Details
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
                {/* End Card */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PackageDetails;
