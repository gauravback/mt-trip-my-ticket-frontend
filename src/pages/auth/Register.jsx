import api from "@/api/api";
import React from "react";
import toast from "react-hot-toast";
import {
  RiLockLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const { name, email, phone, password, confirmpassword } = e.target;
      const response = await api(`/user/register/`, {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        password2: confirmpassword.value,
      });
      const result = await response.data;
      const status = await response.status;

      if (status === 201) {
        toast.success(Object.values(result)[0], { id: "1" });
        navigate("/login");
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch {
      toast.error("Server error", { id: "1" });
    }
  };
  return (
    <div>
      <section className="bg-white max-w-[85rem] mx-auto">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
                Create New Account
              </h1>
              <p className="text-lg">
                Or
                <Link to="/login">
                  <span className="ml-2 text-red-500 font-medium">
                    Login to your account
                  </span>
                </Link>
              </p>
            </div>
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form
                method="POST"
                onSubmit={handleSubmit}
                className="w-full lg:max-w-xl space-y-4"
              >
                <div className="relative flex items-center">
                  <span className="absolute">
                    <RiUserLine className="w-6 h-6 mx-3 text-gray-300" />
                  </span>
                  <input
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Name"
                    required
                    name="name"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <RiMailLine className="w-6 h-6 mx-3 text-gray-300" />
                  </span>
                  <input
                    type="email"
                    required
                    name="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email Address"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <RiPhoneLine className="w-6 h-6 mx-3 text-gray-300" />
                  </span>
                  <input
                    type="tel"
                    required
                    name="phone"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <RiLockLine className="w-6 h-6 mx-3 text-gray-300" />
                  </span>
                  <input
                    type="password"
                    required
                    name="password"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <RiLockLine className="w-6 h-6 mx-3 text-gray-300" />
                  </span>
                  <input
                    type="password"
                    required
                    name="confirmpassword"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
