import api from "@/api/api";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const token = useSelector((state) => state.authReducer?.value?.token);
  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/user/change-password/",
        {
          current_password: e.target.currentPassword.value,
          new_password: e.target.newPassword.value,
          confirm_password: e.target.confirmPassword.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = await response.status;
      if (status === 200) {
        toast.success("Your password has been changed.", { id: 1 });
        navigate("/");
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      if (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.error, { id: 1 });
        } else {
          toast.error("Something went wrong.", { id: 1 });
        }
      }
    }
  };
  return (
    <div>
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Change Password
              </h1>
            </div>
            <div className="mt-5">
              {/* Form */}
              <form method="POST" onSubmit={changePassword}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm mb-2"
                      >
                        Current Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-blue-0"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm mb-2"
                      >
                        New Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-blue-0"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm mb-2"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-blue-0"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-0 transition-all text-sm"
                  >
                    Change Password
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
