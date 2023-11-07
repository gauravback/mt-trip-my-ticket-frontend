import api from "@/api/api";
import BackButton from "@/components/Button/BackButton";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

const SightSeeingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [sightSeeing, setSightSeeing] = useState();
  const fetchSightSeeing = async () => {
    try {
      const response = await api.get(`/api/sightseeing/${id}/`);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setSightSeeing(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchSightSeeing();
  }, []);

  const slidesToShow = sightSeeing
    ? [sightSeeing.image].length + sightSeeing.images.length > 3
      ? 3
      : [sightSeeing.image].length + sightSeeing.images.length
    : 3;
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

  console.log(sightSeeing);
  return (
    <div>
      <div className="mx-auto max-w-2xl  sm:px-6 lg:max-w-7xl lg:px-8">
        <BackButton />
        {sightSeeing && (
          <div className="bg-white">
            <div className="pt-6">
              {/* Image gallery */}
              <div className="outline-none hidden md:block">
                <img
                  src={sightSeeing.image}
                  alt=""
                  ref={mainImage}
                  className="object-cover object-center rounded-md outline-none w-full h-[35rem]"
                />
              </div>

              <div className="mt-4 flex items-center w-full justify-center">
                <Slider {...settings} className="w-full">
                  <div className="outline-none ">
                    <img
                      src={sightSeeing.image}
                      alt=""
                      onClick={() => {
                        changeImage(sightSeeing.image);
                      }}
                      className="object-cover object-center rounded-md outline-none w-full h-56"
                    />
                  </div>
                  {sightSeeing?.images?.map((image) => (
                    <div className="outline-none ">
                      <img
                        onClick={() => {
                          changeImage(
                            `${import.meta.env.VITE_APP_API_URL}${image.image}`
                          );
                        }}
                        src={`${import.meta.env.VITE_APP_API_URL}${
                          image.image
                        }`}
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
                    {sightSeeing?.name}
                  </h1>
                </div>

                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  {/* <p className="text-3xl tracking-tight text-gray-900">
                  <span
                    dangerouslySetInnerHTML={{ __html: currencySymbol }}
                  ></span>
                  {parseFloat(sightSeeing?.charter_price * priceRate).toFixed(
                    2
                  )}
                  /Hour
                </p> */}
                  <div className="flex items-center w-full space-x-2">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${sightSeeing.name}`}
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
                  <div className="mt-12">
                    <h3 className="font-semibold text-gray-900">Inclusions</h3>
                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {sightSeeing?.inclusions
                          ?.split(/[\n,]/)
                          ?.map((info) => (
                            <li className="text-gray-600 capitalize">
                              <span className="text-gray-600">{info}</span>
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
                        {sightSeeing?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SightSeeingDetails;
