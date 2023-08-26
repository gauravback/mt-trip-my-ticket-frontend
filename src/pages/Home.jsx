import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import api from "@/api/api";
import toast from "react-hot-toast";
import Filter from "@/components/FlightFilter/FlightFilter";
const Home = () => {
  const settings = {
    dots: true,
    arrows: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidsToShow: 1,
    slidesToScroll: 1,
  };

  const [images, setImages] = useState();

  const getAdImages = async () => {
    const response = await api.get("/api/adimages/");
    var result = await response.data;
    const status = await response.status;
    if (status === 200) {
      setImages(result);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAdImages();
  }, []);
  return (
    <div className="">
      <main>
        <div className="h-[40rem]">
          <Filter />
        </div>
        <section aria-labelledby="collections-heading" className="mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Offers
              </h2>
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-4">
                <div className="flex bg-white transition hover:shadow-xl border rounded-lg">
                  <div className="hidden sm:block sm:basis-56 p-1">
                    <img
                      alt="Guitar"
                      src="/offer.jpg"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          30% off on family travel packages.
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                    <div className="sm:flex sm:items-end sm:justify-end">
                      <a
                        href="#"
                        className="block bg-red-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-400"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white transition hover:shadow-xl border rounded-lg">
                  <div className="hidden sm:block sm:basis-56 p-1">
                    <img
                      alt="Guitar"
                      src="/offer.jpg"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          30% off on family travel packages.
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                    <div className="sm:flex sm:items-end sm:justify-end">
                      <a
                        href="#"
                        className="block bg-red-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-400"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white transition hover:shadow-xl border rounded-lg">
                  <div className="hidden sm:block sm:basis-56 p-1">
                    <img
                      alt="Guitar"
                      src="/offer.jpg"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          30% off on family travel packages.
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                    <div className="sm:flex sm:items-end sm:justify-end">
                      <a
                        href="#"
                        className="block bg-red-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-400"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white transition hover:shadow-xl border rounded-lg">
                  <div className="hidden sm:block sm:basis-56 p-1">
                    <img
                      alt="Guitar"
                      src="/offer.jpg"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          30% off on family travel packages.
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                    <div className="sm:flex sm:items-end sm:justify-end">
                      <a
                        href="#"
                        className="block bg-red-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-400"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex bg-white transition hover:shadow-xl border rounded-lg">
                  <div className="hidden sm:block sm:basis-56 p-1">
                    <img
                      alt="Guitar"
                      src="/offer.jpg"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                      <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                          30% off on family travel packages.
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                    <div className="sm:flex sm:items-end sm:justify-end">
                      <a
                        href="#"
                        className="block bg-red-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-red-400"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
