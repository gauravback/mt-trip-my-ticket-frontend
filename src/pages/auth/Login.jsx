import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { RiLockLine, RiMailLine } from "react-icons/ri";
import api from "@/api/api";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Done...", { id: "1" });
      if (status === 200) {
        dispatch(login({ token: result.access, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        navigate("/");
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "1" });
    }
  };

  return (
    <div className="flex items-center justify-center w-full pt-16">
      <div className="mx-auto max-w-screen-xl w-full px-4  sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
          <p className="mt-4 text-gray-700 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Create new one
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="">
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm focus:outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm  focus:outline-none"
                placeholder="Enter password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                {showPassword ? (
                  <VscEyeClosed
                    fontSize={20}
                    className="transition-all duration-700 ease-in-out delay-300"
                  />
                ) : (
                  <VscEye
                    fontSize={20}
                    className="transition-all duration-700 ease-in-out delay-300"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="inline-block w-full rounded-lg  px-5 py-3 text-sm font-medium btn-gradient"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
