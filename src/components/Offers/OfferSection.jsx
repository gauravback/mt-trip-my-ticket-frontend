import React from "react";
import OfferCards from "./OfferCards";

const OfferSection = ({ title, offers }) => {
  if (offers.length === 0) {
    return null; // Don't render the section if no offers in this category
  }
  return (
    <div>
      <div className="mx-auto  pt-16 sm:pt-8 sm:pb-10 lg:max-w-none">
        <h2
          id="collections-heading"
          className="text-2xl font-bold text-gray-900"
        >
          {title} Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 lg:gap-x-6 lg:gap-y-4 mt-6">
          {offers?.map(({ id, title, image, description, end_date }) => (
            <OfferCards
              key={id}
              title={title}
              image={image}
              description={description}
              endDate={end_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
