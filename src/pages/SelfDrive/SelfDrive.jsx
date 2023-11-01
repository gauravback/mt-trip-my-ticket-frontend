import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
          <div
            key={drive.id}
            className="group flex flex-col h-full border border-gray-200 hover:border-transparent transition-all duration-300 rounded-xl p-5"
          >
            <div className="aspect-w-16 aspect-h-11">
              <img
                className="w-full object-cover rounded-xl"
                src={drive.image}
                alt="Image Description"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {drive.name}
              </h3>
              <p className="font-medium">Mileage</p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <Link to={`/self-drive/${drive.id}`}>
                <button
                  type="button"
                  className="btn-gradient px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfDrive;
