import React, { useEffect, useState } from "react";
import OfferCards from "./OfferCards";
import api from "@/api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OfferSection = () => {
  const [offers, setOffers] = useState();
  const dispatch = useDispatch();

  const fetchOffers = async () => {
    try {
      const response = await api.get("/api/offers/");
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setOffers(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="max-w-[85rem] mx-auto">
      <div className="mx-auto  pt-16 sm:pt-8 sm:pb-10 lg:max-w-none">
        <h2
          id="collections-heading"
          className="text-2xl font-bold text-gray-900"
        >
          Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 lg:gap-x-6 gap-y-4 mt-6">
          {offers?.map(
            ({
              id,
              code,
              title,
              image,
              description,
              discount_percent,
              end_date,
              flights,
              cars,
              hotels,
              buses,
              packages,
            }) => (
              <OfferCards
                key={id}
                title={title}
                image={image}
                description={description}
                endDate={end_date}
                code={code}
                discountPercent={discount_percent}
                flights={flights.length > 0 ? flights : ""}
                cars={cars.length > 0 ? cars : ""}
                hotels={hotels.length > 0 ? hotels : ""}
                buses={buses.length > 0 ? buses : ""}
                packages={packages.length > 0 ? packages : ""}
                dispatch={dispatch}
                navigate={navigate}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
