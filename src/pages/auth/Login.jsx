import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { RiLockLine, RiMailLine } from "react-icons/ri";
import api from "@/api/api";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const response = await api.post(`/user/login/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      const result = await response.data;
      const status = await response.status;
      console.log(result);
      toast.success("Done...", { id: "1" });
      if (status === 200) {
        dispatch(login({ token: result.access, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        navigate("/");
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch {
      toast.error("Server error.", { id: "1" });
    }
  };
  return (
    <div>
      <section className="max-w-[85rem] mx-auto min-h-screen">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
                Login to your account
              </h1>
              <p className="text-lg">
                Or
                <Link to="/register">
                  <span className="ml-2 text-gradientfont-medium">
                    Create new account
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
                {/* Email */}
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

                {/* Password */}
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

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-lg btn-gradient focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Login
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

export default Login;
