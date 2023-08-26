import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Bookings from "../components/Bookings";
const Profile = () => {
  const [user, setUser] = useState();
  const token = useSelector((state) => state.authReducer?.value?.token);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/user/profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      const status = await response.status;

      if (status === 200) {
        setUser(result);
        toast.dismiss();
      } else {
        toast.error("Error fetching user details", { id: "1" });
      }
    } catch {
      toast.error("Server error", { id: "1" });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/user/profile/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.target.name.value,
            phone: e.target.phone.value,
          }),
        }
      );
      const status = await response.status;
      if (status === 200) {
        toast.success("Profile updated successfully", { id: "1" });
        setTimeout(() => {
          fetchUserDetails();
        }, 2000);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch {
      toast.error("Server error", { id: "1" });
    }
  };
  return (
    <div>
      <div className="py-10 sm:mt-0">
        <div className="md:gap-6 max-w-lg mx-auto">
          <div className="">
            <div className="px-6">
              <h3 className="text-xl font-bold leading-6 text-gray-900">
                Profile
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
            <form onSubmit={handleSubmit} method="POST">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <div className=" gap-6">
                    <div className="">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.name}
                        id="name"
                        className="mt-1 border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 gap-6">
                    <div className="">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        disabled={true}
                        defaultValue={user?.email}
                        id="email"
                        className="mt-1 border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 gap-6">
                    <div className="">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        defaultValue={user?.phone}
                        id="phone"
                        className="mt-1 border p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className=" w-full px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-bold text-center mb-7">Bookings</h1>
          <Bookings />
        </div>
      </div>
    </div>
  );
};

export default Profile;
