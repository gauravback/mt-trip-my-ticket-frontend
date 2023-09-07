import NewFilter from "@/components/NewFilter/NewFilter";
import React from "react";
import Slider from "react-slick";

const Home = () => {
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidsToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    variableWidth: true,
  };
  return (
    <div>
      <div className="bg-prime">
        <NewFilter />
      </div>
      {/* Exclusive Deals */}
      <div className="max-w-[85rem] px-4 border-b py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
        <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center justify-between w-full">
          <h2 className="text-2xl md:text-4xl md:leading-tight">
            Exclusive <span className="font-bold">Deals</span>
          </h2>
          <select class="py-2 px-3 pr-9 block w-auto bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:hidden">
            <option>All</option>
          </select>
          <div className="hidden sm:flex justify-end space-x-6">
            <button
              type="button"
              className="font-semibold py-2 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-theme"
            >
              All
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          <div>
            <div className="flex w-full border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h- sm:h-56 w-32 sm:w-48 rounded-xl object-cover shadow-xl transition"
              />
              <div className="p-4 w-full">
                <a href="#">
                  <h3 className="text-lg font-medium text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </a>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex w-full border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h- sm:h-56 w-32 sm:w-48 rounded-xl object-cover shadow-xl transition"
              />
              <div className="p-4 w-full">
                <a href="#">
                  <h3 className="text-lg font-medium text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </a>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex w-full border border-gray-200 shadow-md rounded-md">
              <img
                alt="Lava"
                src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h- sm:h-56 w-32 sm:w-48 rounded-xl object-cover shadow-xl transition"
              />
              <div className="p-4 w-full">
                <a href="#">
                  <h3 className="text-lg font-medium text-gray-900">
                    Finding the Journey to Mordor
                  </h3>
                </a>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </div>
          </div>

          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      {/* Exclusive Deals End */}
      {/*  Popular Destination  */}
      <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto w-full">
        <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center space-x-12 w-full">
          <h2 className="text-2xl md:text-4xl md:leading-tight">
            Popular <span className="font-bold">Destinations</span>
          </h2>
          <select class="py-2 px-3 pr-9 block w-auto bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:hidden">
            <option>All</option>
          </select>
          <div className="hidden sm:flex space-x-6">
            <button
              type="button"
              className="font-semibold inline-flex items-center gap-x-2  border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-theme"
            >
              All
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card */}
          <div className="relative h-80 overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt="Office"
              src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
              className="absolute inset-0 h-96 w-full object-cover"
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <div>
                  <h3 className="mt-0.5 text-xl font-black text-white">
                    Mumbai
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}
          <div className="relative h-80 overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt="Office"
              src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
              className="absolute inset-0 h-96 w-full object-cover"
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <div>
                  <h3 className="mt-0.5 text-xl font-black text-white">
                    Mumbai
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}
          <div className="relative h-80 overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt="Office"
              src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
              className="absolute inset-0 h-96 w-full object-cover"
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <div>
                  <h3 className="mt-0.5 text-xl font-black text-white">
                    Mumbai
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}
          <div className="relative h-80 overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt="Office"
              src="https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg"
              className="absolute inset-0 h-96 w-full object-cover"
            />
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <div>
                  <h3 className="mt-0.5 text-xl font-black text-white">
                    Mumbai
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      {/*  Popular Destination  End */}
      {/*  Popular Destination  */}
      <div className="max-w-[85rem] px-4 py-8 sm:px-6 lg:px-8 mx-auto w-full">
        <div className="mx-auto text-center mb-10 lg:mb-14 flex items-center space-x-12 w-full">
          <h2 className="text-2xl md:text-4xl md:leading-tight">
            Travel <span className="font-bold">Stories</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card */}

          <div className="group relative h-[28rem] block bg-gray-800">
            <img
              alt="Developer"
              src="/blog55.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-white border rounded-full text-center">
                Hotel
              </p>

              <div className="mt-72 md:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text- font-bold text-white">
                    Top 10 most expensive hotes in india.
                  </p>
                  <p className="text-sm text-white">
                    To have an unforgettable experience it’s important to find a
                    hotel that treats you and your family like...
                  </p>
                  <button
                    type="button"
                    className="py-3 w-full mt-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-white font-semibold text-white hover:text-gray-900 hover:bg-white focus:outline-none focus:ring-0 transition-all text-sm"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}

          <div className="group relative h-[28rem] block bg-gray-800">
            <img
              alt="Developer"
              src="/blog55.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-white border rounded-full text-center">
                Hotel
              </p>

              <div className="mt-72 md:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text- font-bold text-white">
                    Top 10 most expensive hotes in india.
                  </p>
                  <p className="text-sm text-white">
                    To have an unforgettable experience it’s important to find a
                    hotel that treats you and your family like...
                  </p>
                  <button
                    type="button"
                    className="py-3 w-full mt-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-white font-semibold text-white hover:text-gray-900 hover:bg-white focus:outline-none focus:ring-0 transition-all text-sm"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}

          <div className="group relative h-[28rem] block bg-gray-800">
            <img
              alt="Developer"
              src="/blog55.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-white border rounded-full text-center">
                Hotel
              </p>

              <div className="mt-72 md:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text- font-bold text-white">
                    Top 10 most expensive hotes in india.
                  </p>
                  <p className="text-sm text-white">
                    To have an unforgettable experience it’s important to find a
                    hotel that treats you and your family like...
                  </p>
                  <button
                    type="button"
                    className="py-3 w-full mt-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-white font-semibold text-white hover:text-gray-900 hover:bg-white focus:outline-none focus:ring-0 transition-all text-sm"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
          {/* Card */}

          <div className="group relative h-[28rem] block bg-gray-800">
            <img
              alt="Developer"
              src="/blog55.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-white border rounded-full text-center">
                Hotel
              </p>

              <div className="mt-72 md:mt-48">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text- font-bold text-white">
                    Top 10 most expensive hotes in india.
                  </p>
                  <p className="text-sm text-white">
                    To have an unforgettable experience it’s important to find a
                    hotel that treats you and your family like...
                  </p>
                  <button
                    type="button"
                    className="py-3 w-full mt-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-white font-semibold text-white hover:text-gray-900 hover:bg-white focus:outline-none focus:ring-0 transition-all text-sm"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      {/*  Popular Destination  End */}
    </div>
  );
};

export default Home;
