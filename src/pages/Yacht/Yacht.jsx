import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdCabin, MdOutlineBathroom } from "react-icons/md";
const Yacht = () => {
  const [yachts, setYachts] = useState();
  const fetchYachts = async () => {
    try {
      const response = await api.get("/api/yachts/");
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setYachts(result);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: 1 });
    }
  };

  useEffect(() => {
    fetchYachts();
  }, []);
  return (
    <div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="mt-12  max-w-2xl   lg:max-w-7xl px-4 ">
          <h1 className="text-2xl font-bold mb-5">Yachts</h1>
        </div>
        <div className="p-3 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-y-4 gap-6">
            {/* Card */}
            {yachts?.map((yacht) => (
              <div className="relative mx-auto w-full border border-gray-300 rounded-md">
                <div className="relative inline-block duration-300 ease-in-out transition-transform transform  w-full">
                  <div className="shadow p-4 rounded-lg bg-white">
                    <div className="flex justify-center rounded-lg overflow-hidden h-52">
                      <div className=" duration-500 transform ease-in-out  w-full h-full">
                        <img
                          className="bg-black w-full h-full"
                          width={"100%"}
                          height={"100%"}
                          src={yacht.image}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="font-medium text-lg md:text-xl text-gray-800 line-clamp-1 capitalize">
                        {yacht.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <BsPeople fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {yacht.capacity} People
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <SlSizeFullscreen />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {yacht.size} Size
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdCabin fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {yacht.cabins} Cabins
                        </span>
                      </p>
                      <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <MdOutlineBathroom fontSize={20} />
                        <span className="mt-2 xl:mt-0 ml-1.5">
                          {yacht.bathrooms} Bathrooms
                        </span>
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                          {/* <span
                            className="uppercase"
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span> */}
                          <span className="text-lg">
                            {/* {parseFloat(pkg.price * priceRate).toFixed(2)} */}
                          </span>
                        </p>
                        <Link to={`/yacht/${yacht.id}`}>
                          <button className="inline-block font-semibold text-gradient p-2 whitespace-nowrap  leading-tight rounded-xl">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
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

export default Yacht;
