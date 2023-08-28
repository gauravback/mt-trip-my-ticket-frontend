import { format } from "date-fns";
import React from "react";
const OfferCards = ({ title, image, description, endDate }) => {
  return (
    <div>
      <div>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-16 p-4 flex justify-end items-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>

          <div className="p-4 text-gray-700 flex justify-between items-start">
            <div>
              <p className="text-xl font-semibold text-gray-900 leading-none my-1">
                {title}
              </p>
              <p className="text-sm">{description.split(".")[0]}.</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-800">
            <div className="flex items-center">
              <p>
                <span className="text-sm pr-1">Valid Till</span>{" "}
                <span className="text-gray-900 font-bold">
                  {format(new Date(endDate), "dd MMMM, yyyy")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card End */}
    </div>
  );
};

export default OfferCards;
