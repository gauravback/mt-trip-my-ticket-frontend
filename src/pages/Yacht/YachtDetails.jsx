import api from "@/api/api";
import BackButton from "@/components/Button/BackButton";
import { showRazorpay } from "@/components/Payment/Payment";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { SiPandas } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
const YachtDetails = () => {
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const token = useSelector((state) => state.authReducer?.value?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [yachtDetails, setYachtDetails] = useState();
  const fetchYachtDetails = async () => {
    try {
      const response = await api.get(`/api/yachts/${id}/`);
      const result = await response.data;
      const status = await response.status;

      if (status === 200) {
        setYachtDetails(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchYachtDetails();
  }, [id]);
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
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 4000,
        },
      },
    ],
  };
  const mainImage = useRef();
  const changeImage = (image) => {
    mainImage.current.src = image;
  };
  return (
    <div className="mx-auto max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
      <BackButton />
      {yachtDetails && (
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="outline-none hidden md:block">
              <img
                src={yachtDetails.image}
                alt=""
                ref={mainImage}
                className="object-cover object-center rounded-md outline-none w-full h-[35rem]"
              />
            </div>

            <div className="mt-4 flex items-center w-full justify-center">
              <Slider {...settings} className="w-full">
                <div className="outline-none ">
                  <img
                    src={yachtDetails.image}
                    alt=""
                    onClick={() => {
                      changeImage(yachtDetails.image);
                    }}
                    className="object-cover object-center rounded-md outline-none w-full h-56"
                  />
                </div>
                {yachtDetails?.images?.map((image) => (
                  <div className="outline-none ">
                    <img
                      onClick={() => {
                        changeImage(
                          `${import.meta.env.VITE_APP_API_URL}${image.image}`
                        );
                      }}
                      src={`${import.meta.env.VITE_APP_API_URL}${image.image}`}
                      alt=""
                      className="object-cover object-center rounded-md outline-none w-full h-56"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="mx-auto max-w-2xl px-4 pt-10  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-10">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight capitalize text-gray-900 sm:text-3xl">
                  {yachtDetails?.name}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                {/* <p className="text-3xl tracking-tight text-gray-900">
                  <span
                    dangerouslySetInnerHTML={{ __html: currencySymbol }}
                  ></span>
                  {parseFloat(yachtDetails?.charter_price * priceRate).toFixed(
                    2
                  )}
                  /Hour
                </p> */}
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-gray-900">
                    Amenities
                  </h3>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {yachtDetails?.amenities
                        ?.split(/[\n,]/)
                        ?.map((amenity) => (
                          <li className="text-gray-600 capitalize">
                            <span className="text-gray-600">{amenity}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {yachtDetails?.description}
                    </p>
                  </div>
                </div>
                <div className="mt-10 ">
                  <div className="">
                    <div className="gap-y-3 grid grid-cols-1 md:grid-cols-3">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Capacity: </span>{" "}
                          {yachtDetails?.capacity} Person
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Size: </span>{" "}
                          {yachtDetails?.size}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Crew Members: </span>{" "}
                          {yachtDetails?.crew_members}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Maximum Speed: </span>{" "}
                          {yachtDetails?.maximum_speed}/Kmph
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Cabins: </span>{" "}
                          {yachtDetails?.cabins}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Bathroom: </span>{" "}
                          {yachtDetails?.bathrooms}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Fuel Capacity: </span>{" "}
                          {yachtDetails?.fuel_capacity} Litres
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Hull Material: </span>{" "}
                          {yachtDetails?.hull_material}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 capitalize">
                          <span className="font-medium">Fuel Capacity: </span>{" "}
                          {yachtDetails?.fuel_capacity} Litres
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: yachtDetails?.id,
                      type: "yacht",
                      price: yachtDetails?.charter_price,
                    })
                  );
                  navigate("/checkout");
                }}
                className="btn-gradient w-full p-2 rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YachtDetails;
