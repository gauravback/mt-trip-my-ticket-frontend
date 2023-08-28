import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "@/api/api";
import toast from "react-hot-toast";
import Filter from "@/components/FlightFilter/Filter";
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
          className="mt-12 max-w-[85rem] mx-auto"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {cars && (
              <div className="mx-auto lg:max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cars</h2>
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-4">
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
            <div className="mx-auto  pt-16 sm:py-24 lg:max-w-none">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Offers
              </h2>
              <div className="lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
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
