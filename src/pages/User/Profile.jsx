import api from "@/api/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { format } from "date-fns";

const Profile = () => {
  const [user, setUser] = useState();
  const token = useSelector((state) => state.authReducer?.value?.token);
  const fetchProfile = async () => {
    toast.loading("Processing...", { id: "1" });
    try {
      const response = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = await response.status;
      if (status === 200) {
        setUser(response.data);
        toast.dismiss("1");
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);
  const updateButton = (text, fontSize = null) => {
    return (
      <UpdateProfile
        text={text}
        fontSize={fontSize}
        name={user?.name}
        email={user?.email}
        phone={user?.phone}
        birthday={user?.birthday}
        gender={user?.gender}
        meritalStatus={user?.merital_status}
        address={user?.address}
        provider={user?.provider}
        fetchProfile={fetchProfile}
        token={token}
      />
    );
  };
  return (
    <div className="flex items-center justify-center md:bg-transparent bg-white h-full w-full">
      <div className="md:bg-white max-w-[85rem] w-full md:border rounded-md md:my-12 mx-auto md:shadow px-8 py-24">
        <div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-end sm:space-x-5">
              <div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 className="truncate text-2xl font-bold text-gray-900">
                    {user?.name ? user.name : updateButton("Name", "2xl")}
                  </h1>
                </div>
              </div>
            </div>
            <div className="hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {user?.name ? user.name : updateButton("Name")}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.phone ? user.phone : updateButton("Phone")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.email ? user.email : updateButton("Email Address")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Birthday</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.email
                  ? format(new Date(user?.birthday), "dd MMMM, yyyy")
                  : updateButton("Birthday")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Merital Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">
                {user?.merital_status
                  ? user.merital_status
                  : updateButton("Merital Status")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">
                {user?.gender ? user.gender : updateButton("Gender")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.address ? user.address : updateButton("Address")}
              </dd>
            </div>
            <div className="border w-36 rounded-md border-blue-600 bg-blue-50 flex items-center justify-center p-2">
              <UpdateProfile text="Update profile" />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
