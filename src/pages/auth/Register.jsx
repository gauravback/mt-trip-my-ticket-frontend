import api from "@/api/api";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    digit: false,
    specialCharacter: false,
    length: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const phone = e.target.phone.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmpassword.value;

      // Validate phone number
      const phoneRegex = /^\d{10,13}$/; // Matches 10 to 13 digits
      if (!phone.match(phoneRegex)) {
        toast.error("Phone number must be between 10 and 13 digits", {
          id: "1",
        });
        return;
      }

      // Validate password
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,16}$/;
      const isPasswordValid = password.match(passwordRegex);
      setPasswordValidation({
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit: /\d/.test(password),
        specialCharacter: /[@#$%^&*!]/.test(password),
        length: password.length >= 8 && password.length <= 16,
      });

      if (!isPasswordValid) {
        return;
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match", { id: "1" });
        return;
      }
      const response = await api.post(`/user/register/`, {
        name: name,
        email: email,
        phone: phone,
        password: password,
        password2: confirmPassword,
      });
      const result = await response.data;
      console.log(result);
      const status = await response.status;

      if (status === 201) {
        toast.success("Account created successfully", { id: "1" });
        navigate("/login");
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error", { id: "1" });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center w-full pt-16">
      <div className="mx-auto max-w-screen-xl w-full px-4  sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create New Account</h1>
          <p className="mt-4 text-gray-700 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="">
              <input
                type="text"
                name="name"
                className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm focus:outline-none"
                placeholder="Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="">
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm focus:outline-none"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <div className="">
              <input
                type="text"
                name="phone"
                className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm focus:outline-none"
                placeholder="Phone Number"
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
                placeholder="Password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                tabIndex="-1"
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
          <div className="text-red-500 mt-2 text-sm">
            {!passwordValidation.uppercase && (
              <p>Password should have at least 1 capital letter</p>
            )}
            {!passwordValidation.lowercase && (
              <p>Password should have at least 1 lowercase letter</p>
            )}
            {!passwordValidation.digit && (
              <p>Password should have at least 1 digit</p>
            )}
            {!passwordValidation.specialCharacter && (
              <p>Password should have at least 1 special character</p>
            )}
            {!passwordValidation.length && (
              <p>Password must be 8 to 16 characters long</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmpassword" className="sr-only">
              Confirm Password
            </label>
            <div className="">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm  focus:outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="inline-block w-full rounded-lg  px-5 py-3 text-sm font-medium btn-gradient"
            >
              Create New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
