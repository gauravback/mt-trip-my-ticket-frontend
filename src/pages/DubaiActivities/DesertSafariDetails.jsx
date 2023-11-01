import api from "@/api/api";
import BackButton from "@/components/Button/BackButton";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { SiPandas } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
const DesertSafariDetails = () => {
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const token = useSelector((state) => state.authReducer?.value?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [desertSafari, setDesertSafari] = useState();
  const fetchDesertSafari = async () => {
    try {
      const response = await api.get(`/api/desert-safaris/${id}/`);
      const result = await response.data;
      const status = await response.status;

      if (status === 200) {
        setDesertSafari(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchDesertSafari();
  }, [id]);

  const slidesToShow = desertSafari
    ? [desertSafari.image].length + desertSafari.images.length > 3
      ? 3
      : [desertSafari.image].length + desertSafari.images.length
    : 3;
  console.log("Slides to show", slidesToShow);
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: slidesToShow,
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
      {desertSafari && (
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="outline-none hidden md:block">
              <img
                src={desertSafari.image}
                alt=""
                ref={mainImage}
                className="object-cover object-center rounded-md outline-none w-full h-[35rem]"
              />
            </div>

            <div className="mt-4 flex items-center w-full justify-center">
              <Slider {...settings} className="w-full">
                <div className="outline-none ">
                  <img
                    src={desertSafari.image}
                    alt=""
                    onClick={() => {
                      changeImage(desertSafari.image);
                    }}
                    className="object-cover object-center rounded-md outline-none w-full h-56"
                  />
                </div>
                {desertSafari?.images?.map((image) => (
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
                  {desertSafari?.name}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                {/* <p className="text-3xl tracking-tight text-gray-900">
                  <span
                    dangerouslySetInnerHTML={{ __html: currencySymbol }}
                  ></span>
                  {parseFloat(desertSafari?.charter_price * priceRate).toFixed(
                    2
                  )}
                  /Hour
                </p> */}
                <div className="mt-12">
                  <h3 className="font-semibold text-gray-900">Inclusions</h3>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {desertSafari?.inclusions
                        ?.split(/[\n,]/)
                        ?.map((inclusion) => (
                          <li className="text-gray-600 capitalize">
                            <span className="text-gray-600">{inclusion}</span>
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
                      {desertSafari?.description}
                    </p>
                  </div>
                </div>
                <div className="mt-10 ">
                  <div className="">
                    <div className="gap-y-3 ">
                      <div className="flex items-center">
                        <div className="text-gray-900 capitalize">
                          <p className="font-semibold text-2xl mb-4">
                            What to Expect?
                          </p>{" "}
                          <p className="leading-loose">
                            {desertSafari.schedule}
                          </p>
                        </div>
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
                      id: desertSafari?.id,
                      type: "desert-safari",
                      price: desertSafari?.price,
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

export default DesertSafariDetails;
