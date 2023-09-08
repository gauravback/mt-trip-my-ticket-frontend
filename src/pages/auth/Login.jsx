import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { Link } from "react-router-dom";

import api from "@/api/api";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const dispatch = useDispatch();
  const [usePhone, setUsePhone] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
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
        dispatch(login({ token: result.token, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        window.location.reload();
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "1" });
    }
  };

  const handleGoogleLogin = async (res) => {
    try {
      const response = await api.post("/user/login/google/", {
        token: res.credential,
      });
      const result = await response.data;
      const status = await response.status;
      toast.success("Done...", { id: "1" });
      if (status === 200) {
        dispatch(login({ token: result.token, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        window.location.reload();
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "1" });
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Sending OTP...");
      const response = await api.post("/user/send-otp/", {
        phone: e.target.mobile.value,
      });
      const status = await response.status;
      if (status === 200) {
        toast.success("An OTP has been sent to your mobile number", {
          id: "1",
        });
        setOTPSent(true);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "1" });
    }
  };
  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/verify-otp/", {
        otp: e.target.otp.value,
      });
      const status = await response.status;
      const result = await response.data;

      if (status === 200) {
        dispatch(login({ token: result.token, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        window.location.reload();
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Incorrect OTP", { id: "1" });
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    }
  };
  // 802918
  return (
    <div>
      <div
        id="hs-modal-signin"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[700] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800">
                  Sign in
                </h2>
              </div>
              <div className="mt-5">
                <div className="w-full flex items-center justify-center">
                  <GoogleLogin
                    type="standard"
                    theme="outline"
                    logo_alignment="center"
                    shape="rectangular"
                    size="large"
                    width={"100%"}
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLogin}
                  />
                </div>
                {/* <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-0 transition-all text-sm">
                <FcGoogle fontSize={24} />
                Sign up with Google
              </button> */}

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">
                  Or
                </div>
                {/* Form */}
                {!usePhone ? (
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-0"
                            required
                            aria-describedby="email-error"
                          />
                        </div>
                      </div>
                      {/* End Form Group */}
                      {/* Form Group */}
                      <div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="password"
                            className="block text-sm mb-2"
                          >
                            Password
                          </label>
                          <Link to="/forgot-password">
                            <p
                              tabIndex="-1"
                              className="text-sm text-[#d32f2f] decoration-2 hover:underline font-medium"
                            >
                              Forgot password?
                            </p>
                          </Link>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-0"
                            required
                            aria-describedby="password-error"
                          />
                        </div>
                      </div>
                      {/* End Form Group */}

                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        Sign in
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUsePhone(true);
                        }}
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-red-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-all text-sm"
                      >
                        Sign in using mobile number
                      </button>
                    </div>
                  </form>
                ) : OTPSent ? (
                  <form method="POST" onSubmit={verifyOTP}>
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="otp"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Enter OTP
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            defaultValue=""
                            id="otp"
                            name="otp"
                            className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-0"
                            required
                          />
                        </div>
                      </div>
                      {/* End Form Group */}
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                ) : (
                  <form method="POST" onSubmit={sendOTP}>
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="mobile"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Mobile Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-0"
                            required
                          />
                        </div>
                      </div>
                      {/* End Form Group */}
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-0 transition-all text-sm"
                      >
                        Send OTP
                      </button>
                      <button
                        onClick={() => {
                          setUsePhone(false);
                        }}
                        type="button"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-red-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 transition-all text-sm"
                      >
                        Sign in using Email Address
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
