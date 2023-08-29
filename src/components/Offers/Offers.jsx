import React, { useEffect, useState } from "react";
import OfferSection from "./OfferSection";
import api from "@/api/api";

const Offers = () => {
  const [offers, setOffers] = useState();
  const getOffers = async () => {
    const response = await api.get("/api/offers/");
    var result = await response.data;
    const status = await response.status;
    if (status === 200) {
      setOffers(result);
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getOffers();
  }, []);
  const categorizedOffers = {
    flights: [],
    cars: [],
    hotels: [],
    buses: [],
    packages: [],
  };

  offers?.forEach((offer) => {
    if (offer.flights.length > 0) {
      categorizedOffers.flights.push(offer);
    } else if (offer.cars.length > 0) {
      categorizedOffers.cars.push(offer);
    } else if (offer.hotels.length > 0) {
      categorizedOffers.hotels.push(offer);
    } else if (offer.buses.length > 0) {
      categorizedOffers.buses.push(offer);
    } else if (offer.packages.length > 0) {
      categorizedOffers.packages.push(offer);
    }
  });
  return (
    <div>
      <OfferSection offers={categorizedOffers.flights} title="Flights" />
      <OfferSection offers={categorizedOffers.cars} title="Cars" />
      <OfferSection offers={categorizedOffers.hotels} title="Hotels" />
      <OfferSection offers={categorizedOffers.buses} title="Buses" />
    </div>
  );
};

export default Offers;
