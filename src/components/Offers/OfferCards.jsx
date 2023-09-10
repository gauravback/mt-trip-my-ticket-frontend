import { format } from "date-fns";
import React from "react";
const OfferCards = ({
  title,
  code,
  image,
  description,
  discountPercent,
  endDate,
}) => {
  return (
    <div>
      <div className="flex w-full mx-auto md:mx-0 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a className="mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img className="object-cover" src={image} alt={title} />
        </a>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-lg tracking-tight font-semibold text-slate-900">
            {title}
          </h5>

          <div className="space-y-2">
            <p>
              <span className="text-xl font-bold text-slate-900">
                {Math.trunc(discountPercent)}% Off
              </span>
            </p>
            <div className="flex items-center">
              Code:
              <div className="text-center ml-1 bg-amber-300 px-1 rounded text-gray-950 font-bold">
                {code}
              </div>
            </div>
          </div>
          <div className="flex items-center  rounded-md py-1 text-center text-sm font-medium text-gray-950 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Valid Till:
            <span className="font-semibold ml-1 text-base">
              {format(new Date(endDate), "dd MMMM, yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCards;
