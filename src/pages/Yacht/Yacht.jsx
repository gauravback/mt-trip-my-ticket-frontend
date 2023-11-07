import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPeople } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { MdCabin, MdOutlineBathroom } from "react-icons/md";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { SlSizeFullscreen } from "react-icons/sl";
import { Link } from "react-router-dom";
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
              <div key={yacht.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${yacht.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={yacht.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {yacht.name}
                    </p>
                  </div>
                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${yacht.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link to={`/yacht/${yacht.id}`} className="w-full">
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
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
