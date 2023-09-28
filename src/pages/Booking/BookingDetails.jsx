import api from "@/api/api";
import BackButton from "@/components/Button/BackButton";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const [booking, setBooking] = useState();
  const { id } = useParams();
  const fetchBookingDetails = async () => {
    try {
      const response = await api.get(`/api/bookings/${id}/`);
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setBooking(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    fetchBookingDetails();
  }, [id]);
  console.log(booking);
  return (
    <div>
      <BackButton />
      {booking && (
        <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-5 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="max-w-xl">
              <p className="mt-2 text-4xl font-bold tracking-tight">
                ID: #{booking?.id}
              </p>
            </div>
            <section
              aria-labelledby="order-heading"
              className="mt-10 border-t border-gray-200"
            >
              <h2 id="order-heading" className="sr-only">
                Your order
              </h2>
              <h3 className="sr-only">Items</h3>
              <div className="flex space-x-6 border-b border-gray-200 py-10">
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">
                      Your booking has been {booking.status} on{" "}
                      {format(new Date(booking.booking_date), "dd MMMM, yyy")}.
                    </h4>
                  </div>
                </div>
              </div>
              <div className="">
                <dl className="grid grid-cols-1 gap-y-10 mt-8">
                  <div>
                    <dt className="font-medium text-gray-900">User Details</dt>
                    <dd className="mt-2 text-gray-700">
                      <span className="block">Name: {booking.user?.name}</span>
                      <span className="block">
                        Email: {booking.user?.email}
                      </span>
                      <span className="block">
                        Contact: {booking.user?.phone}
                      </span>
                    </dd>
                  </div>
                  {booking.car && (
                    <div>
                      <dt className="font-medium text-gray-900">Car Details</dt>
                      <dd className="mt-2 text-gray-700">
                        <span className="block">Make: {booking.car.make}</span>
                        <span className="block">
                          Model: {booking.car.car.model}
                        </span>
                        <span className="block">
                          Seats: {booking.car.car.seats}
                        </span>
                        <span className="block">
                          Type: {booking.car.car.car_type.type}
                        </span>
                      </dd>
                    </div>
                  )}
                  {booking.flight && (
                    <div>
                      <dt className="font-medium text-gray-900">
                        Flight Details
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <span className="block">
                          Flight Number: {booking.flight.flight.flight_number}
                        </span>
                        <span className="block">
                          Airline Name: {booking.flight.flight.airline.name}
                        </span>
                        <span className="block">
                          Flight Name: {booking.flight.flight.name}
                        </span>
                        <span className="block">
                          Depature Airport:{" "}
                          {booking.flight.flight.departure_airport.name},
                          {booking.flight.flight.departure_airport.city}
                        </span>
                      </dd>
                    </div>
                  )}
                  {booking.hotel && (
                    <div>
                      <dt className="font-medium text-gray-900">
                        Hotel Details
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <span className="block">
                          Name: {booking.hotel.hotel.name}
                        </span>
                        <span className="block">
                          City: {booking.hotel.hotel.city}
                        </span>

                        <span className="block">
                          Country: {booking.hotel.hotel.country}
                        </span>
                        <span className="block">
                          Star Category: {booking.hotel.hotel.star_category}
                        </span>
                        <span className="block">
                          Contact: {booking.hotel.hotel.phone_number}
                        </span>
                      </dd>
                    </div>
                  )}
                  {booking.bus && (
                    <div>
                      <dt className="font-medium text-gray-900">Bus Details</dt>
                      <dd className="mt-2 text-gray-700">
                        <span className="block">
                          Bus Number: {booking.bus.bus.bus_number}
                        </span>
                        <span className="block">
                          Bus Type: {booking.bus.bus.bus_type}
                        </span>
                        <span className="block">
                          Operator: {booking.bus.bus.operator}
                        </span>
                        <span className="block">
                          Depaerture City: {booking.bus.bus.departure_city}
                        </span>
                        <span className="block">
                          Arrival City: {booking.bus.bus.arrival_city}
                        </span>
                        <span className="block">
                          Departure Date:{" "}
                          {format(
                            new Date(booking.bus.bus.departure_time),
                            "dd MMMM, yyyy"
                          )}
                        </span>
                      </dd>
                    </div>
                  )}
                  {booking.package && (
                    <div>
                      <dt className="font-medium text-gray-900">
                        Package Details
                      </dt>
                      <dd className="mt-2 text-gray-700">
                        <span className="block">
                          Name: {booking.package.package.name}
                        </span>
                        <span className="block">
                          Origin City: {booking.package.package.origin_city}
                        </span>
                        <span className="block">
                          Destination City:{" "}
                          {booking.package.package.destination_city}
                        </span>
                        <span className="block">
                          Departure:{" "}
                          {format(
                            new Date(booking.package.package.departure),
                            "dd MMMM, yyyy"
                          )}
                        </span>
                        <span className="block">
                          Flights Included:{" "}
                          {booking.package.package.with_flights ? "Yes" : "No"}
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>

                <h3 className="sr-only">Amount</h3>
                <dl className="space-y-6  pt-10 max-w-sm">
                  <div className="">
                    <dt className="font-medium text-gray-900">
                      {booking?.status === "cancelled" && "Refunded "}Amount
                    </dt>
                    <dd className="text-gray-700">
                      &#8377; {booking.payment_amount}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
};

export default BookingDetails;
