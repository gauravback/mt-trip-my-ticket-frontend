import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 ">
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center space-x-1 text-lg border p-2 rounded-md hover:bg-gray-700 transition-all duration-500 hover:text-white"
        >
          <MdArrowBack />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BackButton;
