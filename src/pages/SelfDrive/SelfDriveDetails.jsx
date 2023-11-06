import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const SelfDriveDetails = () => {
  const [selfDrive, setSelfDrive] = useState();
  const { id } = useParams();
  const fetchDetails = async () => {
    try {
      const response = await api.get(`/api/self-drive/${id}/`);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setSelfDrive(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {selfDrive && (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="relative p-6 md:p-16">
            {/* Grid */}
            <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
                  {selfDrive.name}
                </h2>
                {/* Tab Navs */}
                <nav className="grid gap-4 mt-5 md:mt-10 grid-cols-1 sm:grid-cols-2">
                  <div className="flex">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${selfDrive.name}`}
                      className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} /> Send A Message
                    </a>
                  </div>

                  <div className="flex">
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} /> Call Us Now
                    </a>
                  </div>
                </nav>
                {/* End Tab Navs */}
              </div>
              {/* End Col */}
              <div className="lg:col-span-6">
                <div className="relative">
                  {/* Tab Content */}
                  <div>
                    <Slider {...settings}>
                      <div className="aspect-w-12 aspect-h-14">
                        <img
                          className="shadow-xl shadow-gray-200 rounded-xl"
                          src={`${selfDrive.image}`}
                          alt="Image Description"
                        />
                      </div>
                      {selfDrive?.images?.map((image) => (
                        <div className="aspect-w-12 aspect-h-14">
                          <img
                            className="shadow-xl shadow-gray-200 rounded-xl object-fill object-center"
                            src={`${import.meta.env.VITE_APP_API_URL}${
                              image.image
                            }`}
                            alt="Image Description"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  {/* End Tab Content */}
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfDriveDetails;
