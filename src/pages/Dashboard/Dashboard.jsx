import api from "@/api/api";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState();
  const token = useSelector((state) => state.authReducer?.value?.token);

  const fetchUseProfile = async () => {
    try {
      const response = await api.get("/user/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        setUser(result);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Server error", { id: "1" });
    }
  };

  const [bookings, setBookings] = useState();

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/bookings/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data;
      const status = await response.status;

      if (status === 200) {
        if (result.length > 0) {
          setBookings(result);
        }
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchUseProfile();
    fetchBookings();
  }, [token]);

  const updateProfile = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const { name, gender, merital_status, birthday, pin, state } = e.target;

      const response = await api.post(
        "/user/profile/",
        {
          name: name.value,
          gender: gender.value,
          merital_status: merital_status.value,
          address: address.value,
          birthday: birthday.value,
          pin: pin.value,
          state: state.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = await response.status;

      if (status === 200) {
        fetchUseProfile();
        toast.success("Profile updated successfully.", { id: "1" });
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await api.get(`/api/booking/cancel/${bookingId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        fetchBookings();
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  return (
    <div>
      {user && (
        <div className="mx-auto w-full max-w-full  bg-white flex-grow lg:flex xl:px-8 min-h-screen">
          <div className="min-w-0 flex-1 bg-white xl:flex px-12 h-full">
            <div className="bg-white xl:w-80 xl:flex-shrink-0 xl:border-r xl:border-gray-200 h-full">
              <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 flex-shrink-0 flex text-lg font-semibold items-center justify-center border bg-gray-950 text-white">
                          {user.name.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="text-lg font-medium text-gray-900">
                            {user?.name}
                          </div>
                          <div className="group flex items-center space-x-1">
                            <MdAlternateEmail className="text-gray-700" />
                            <span className="text-sm font-medium text-gray-700">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Meta info */}
                    <form method="POST" onSubmit={updateProfile}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          defaultValue={user?.name}
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="gender"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          required
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none capitalize"
                        >
                          <option hidden>{user?.gender}</option>
                          <option value="male">Male</option>
                          <option value="male">Female</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="merital_status"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Merital Status
                        </label>
                        <select
                          id="merital_status"
                          name="merital_status"
                          required
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none capitalize"
                        >
                          <option hidden>{user?.merital_status}</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="birthday"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Birthday
                        </label>
                        <input
                          type="date"
                          id="birthday"
                          required
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none"
                          defaultValue={user?.birthday}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Address
                        </label>
                        <textarea
                          type="text"
                          id="address"
                          name="address"
                          required
                          defaultValue={user?.address}
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none"
                          rows={4}
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="pin"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Pin Code
                        </label>
                        <input
                          type="text"
                          id="pin"
                          name="pin"
                          required
                          defaultValue={user?.pin}
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none"
                          maxLength={6}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="state"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          required
                          defaultValue={user?.state}
                          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:ring-gray-500 sm:p-2 focus:ring-2 focus:outline-none"
                        />
                      </div>

                      <div className="mt-6 grid">
                        <button
                          type="submit"
                          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold  bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Projects List */}
            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
                <div className="flex items-center">
                  <h1 className="flex-1 text-lg font-medium">My Trips</h1>
                </div>
              </div>
              {bookings ? (
                <div className="grid grid-cols-1 gap-y-4 mx-4">
                  {/* Booking */}
                  {bookings
                    ?.filter(
                      (booking) =>
                        booking.status === "confirmed" ||
                        booking.status === "cancelled"
                    )
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-gray-50 border border-gray-300 px-4 py-6 rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8"
                      >
                        <div className="flex-auto space-y-4 divide-y-0  text-gray-800 md:grid md:grid-cols-4 md:gap-x-6 md:space-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                          <div className="flex justify-between md:block">
                            <div className="font-semibold text-gray-900">
                              Booking ID:
                            </div>
                            <div className="md:mt-1 font-medium">
                              #{booking?.id}
                            </div>
                          </div>
                          <div className="flex justify-between md:block">
                            <div className="font-semibold text-gray-900">
                              Booking Date:
                            </div>
                            <div className="md:mt-1 font-medium">
                              {format(
                                new Date(booking.booking_date),
                                "dd MMM, yyy"
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between md:block">
                            <div className="font-semibold text-gray-900">
                              Status:
                            </div>
                            <span
                              className={`md:mt-1 px-2 py-0.5 text-sm font-medium text-center capitalize rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex justify-between md:block">
                            <div className="font-semibold text-gray-900">
                              Amount:
                            </div>
                            <div className="md:mt-1 font-medium">
                              &#8377;{booking.payment_amount}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                          <Link to={`/booking/${booking.id}`}>
                            <button
                              type="button"
                              className="py-3 px-4 w-full md:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm"
                            >
                              View Details
                            </button>
                          </Link>
                          {booking?.status !== "cancelled" && (
                            <button
                              onClick={() => {
                                cancelBooking(booking.id);
                              }}
                              type="button"
                              className="py-3 px-4 w-full md:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-all text-sm"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Booking End */}
                </div>
              ) : (
                <div className="text-center w-full">
                  <h1 className="font-semibold text-2xl">
                    {" "}
                    You don't have any trips.
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
