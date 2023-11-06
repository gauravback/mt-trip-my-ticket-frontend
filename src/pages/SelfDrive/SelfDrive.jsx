import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgDetailsMore } from "react-icons/cg";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { TbArmchair } from "react-icons/tb";
import { Link } from "react-router-dom";

const SelfDrive = () => {
  const [selfDrive, setSelfDrive] = useState();
  const fetchSelfDrive = async () => {
    try {
      const response = await api.get("/api/self-drive/");
      const status = await response.status;
      const result = await response.data;
      if (status === 200) {
        setSelfDrive(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };

  useEffect(() => {
    fetchSelfDrive();
  }, []);
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Self Drive Rental
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selfDrive?.map((drive) => (
          <div className="max-w-sm w-full py-6 px-3">
            <div className="bg-white shadow border rounded-lg overflow-hidden">
              <div
                className="bg-cover bg-center h-96 p-4"
                style={{
                  backgroundImage: `url(${drive.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="p-4">
                <p
                  title={drive.name}
                  className="truncate uppercase tracking-wide  font-bold text-gray-700"
                >
                  {drive.name}
                </p>
              </div>
              <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                <a
                  href={`https://api.whatsapp.com/send?phone=+919804480448&text=${drive.name}`}
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
                <Link to={`/self-drive/${drive.id}`} className="w-full">
                  <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                    <CgDetailsMore fontSize={28} />
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfDrive;
