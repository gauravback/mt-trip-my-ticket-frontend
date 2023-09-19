import api from "@/api/api";
import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyTrips = () => {
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const [trips, setTrips] = useState();
  const token = useSelector((state) => state.authReducer?.value?.token);
  const fetchBookings = async () => {
    try {
      toast.loading("Fetching trips...", { id: 1 });
      const response = await api.get("/api/bookings/user/?status=confirmed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        toast.success("Trips fetched successfully", { id: 1 });
        setTrips(result);
      } else {
        toast.error("Something went wrong", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: 1 });
    }
  };

  useState(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const cancelBooking = async (id) => {
    try {
      toast.loading("Cancelling trip...", { id: 1 });
      const response = await api.get(`/api/booking/cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = await response.status;
      if (status === 200) {
        toast.success("Trip cancelled successfully", { id: 1 });
        fetchBookings();
      } else {
        toast.error("Something went wrong", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: 1 });
    }
  };

  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            My Trips
          </h2>
          <p className="mt-1 text-gray-600">See And Manage Your Trips</p>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {/* Card */}
          {trips
            ?.filter(
              (trip) =>
                trip.status === "confirmed" || trip.status === "cancelled"
            )
            ?.map((trip) => (
              <div className="justify-center flex-1 w-full px-4 py-4 mx-auto bg-white border rounded-md  md:py-10 md:px-10">
                <div>
                  <h1 className="px-4 mb-8 text-2xl font-semibold tracking-wide text-gray-700">
                    {trip.hotel && trip.hotel.hotel.name}
                    {trip.car && `${trip.car.car.make} ${trip.car.car.model}`}
                    {trip.flight && trip.flight.flight.name}
                    {trip.bus && trip.bus.bus.operator}
                    {trip.package && trip.package.package.name}
                  </h1>

                  <div className="flex flex-wrap items-center pb-4 mb-10 border-b border-gray-200">
                    <div className="w-full px-4 mb-4 md:w-1/4">
                      <p className="mb-2 text-sm leading-5 text-gray-600">
                        Order Number:{" "}
                      </p>
                      <p className="text-base font-semibold leading-4 text-gray-800">
                        {trip.id}
                      </p>
                    </div>
                    <div className="w-full px-4 mb-4 md:w-1/4">
                      <p className="mb-2 text-sm leading-5 text-gray-600">
                        Date:{" "}
                      </p>
                      <p className="text-base font-semibold leading-4 text-gray-800">
                        {format(new Date(trip.booking_date), "dd MMMM, yyyy")}
                      </p>
                    </div>
                    <div className="w-full px-4 mb-4 md:w-1/4">
                      <p className="mb-2 text-sm font-medium leading-5 text-gray-800">
                        Total:{" "}
                      </p>
                      <p className="text-base font-semibold leading-4 text-theme">
                        <span
                          dangerouslySetInnerHTML={{ __html: currencySymbol }}
                        ></span>
                        {parseFloat(trip.payment_amount * priceRate).toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full px-4 mb-4 md:w-1/4">
                      <p className="mb-2 text-sm leading-5 text-gray-600">
                        Status
                      </p>
                      <button
                        className={`text-base capitalize font-semibold leading-4 ${
                          trip.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }  rounded-md text-center px-4 py-1 pointer-events-none`}
                      >
                        {trip.status.slice(0, 1).toUpperCase() +
                          trip.status.slice(1, trip.status.length)}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-6">
                    {trip.status === "confirmed" && (
                      <a
                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-md text-gray-90 md:w-auto  "
                      >
                        Download Ticket
                      </a>
                    )}
                    <Link to={`/booking/${trip.id}`}>
                      <button className="w-full px-4 py-2 border border-gray-700 hover:bg-gray-700 hover:text-white rounded-md text-gray-90 md:w-auto  ">
                        View Details
                      </button>
                    </Link>
                    {trip.status === "confirmed" && (
                      <button
                        onClick={() => {
                          cancelBooking(trip.id);
                        }}
                        className="w-full px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 rounded-md text-gray-90 md:w-auto hover:text-white "
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default MyTrips;
