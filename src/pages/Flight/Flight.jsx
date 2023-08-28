import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "@/api/api";
import Filter from "@/components/FlightFilter/Filter";
import { useLocation, useSearchParams } from "react-router-dom";
const Flights = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [message, setMessage] = useState("");
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const arrival = searchParams.get("return");
  const travellers = searchParams.get("travellers");
  const [flights, setFlights] = useState();
  const fetchFlights = async () => {
    const response = await api.get(
      `/api/flights/?departure_airport_city=${
        origin ? origin.replace(" ", "+") : ""
      }&arrival_airport_city=${
        destination ? destination.replace(" ", "+") : ""
      }&departure_time=${departure ? departure : ""}&arrival_time=${
        arrival ? arrival : ""
      }&available_seats_min=${travellers ? travellers : 1}&available_seats_max=`
    );
    const result = await response.data;
    const status = await response.status;

    if (status === 200) {
      if (result.length > 0) {
        setFlights(result);
      } else {
        setMessage("No flights available");
      }
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    if (searchParams.size > 0) {
      if (origin || destination || departure || arrival || travellers) {
        fetchFlights();
      } else {
        setMessage("No flights available");
      }
    }
  }, [location.search]);

  const [tickets, setTickets] = useState([]);

  const increaseTicket = (flightId) => {
    setTickets((prevTickets) => ({
      ...prevTickets,
      [flightId]: (prevTickets[flightId] || 1) + 1,
    }));
  };

  const decreaseTicket = (flightId) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      if (updatedTickets[flightId] > 0) {
        updatedTickets[flightId]--;
      }
      return updatedTickets;
    });
  };

  return (
    <div>
      <main className="">
        <div style={{ backgroundImage: `url("/bg2.jpg")` }}>
          <Filter />
        </div>
        {/* Products */}
        <section
          aria-labelledby="flight-heading"
          className="mt-6 max-w-[85rem] mx-auto"
        >
          <h2 id="flight-heading" className="sr-only">
            Flights
          </h2>
          {flights ? (
            <div className="space-y-8">
              {/* Card */}
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    <div className="sm:flex lg:col-span-6">
                      <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-48 sm:w-48">
                        <img
                          src="/plane.png"
                          alt={flight.name}
                          className="h-full w-full object-contain object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="mt-6 sm:mt-0 sm:ml-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {flight.name}
                        </h3>
                        <p className="mt-2 text-2xl font-medium text-gray-900">
                          &#8377; {Math.trunc(flight.price)}
                        </p>
                        <div className="mt-3 text-gray-700">
                          Available Seats:
                          <p className="font-semibold text-lg">
                            {flight.available_seats}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 lg:col-span-6 lg:mt-0">
                      <div className="grid grid-cols-2 gap-x-6 text-sm">
                        <div>
                          <div className="font-semibold text-xl  text-gray-900">
                            Departure
                          </div>
                          <div className="mt-3 text-gray-700">
                            <p className="font-medium">
                              {flight.departure_airport.name} (
                              {flight.departure_airport.code})
                            </p>

                            <p className="">{flight.departure_airport.city}</p>

                            <p className="">
                              {format(
                                new Date(flight.departure_time),
                                "dd MMMM, yyyy hh:mm a"
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg  text-gray-900">
                            Arrival
                          </div>
                          <div className="mt-3 text-gray-700">
                            <p className="font-medium">
                              {flight.arrival_airport.name} (
                              {flight.arrival_airport.code})
                            </p>
                            <p className="">{flight.arrival_airport.city}</p>
                            <p className="">
                              {format(
                                new Date(flight.arrival_time),
                                "dd MMMM, yyyy hh:mm a"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-6">
                        <div className="mr-2">
                          <div className="inline-flex rounded-md ">
                            <button
                              type="button"
                              onClick={() => decreaseTicket(flight.id)}
                              className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                            >
                              {tickets[flight.id] || 1}
                            </button>
                            <button
                              onClick={() => increaseTicket(flight.id)}
                              type="button"
                              className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-0 transition-all text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="mr-4 text-lg font-semibold">
                          Total: &#8377;
                          {(
                            flight.price * (tickets[flight.id] || 1)
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-6">
                        <button className="py-2 px-5 rounded-md btn-gradient">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card End */}
            </div>
          ) : (
            <div className="w-full text-center my-12">
              <h1 className="text-2xl font-semibold">
                {message ? message : ""}
              </h1>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Flights;
