import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import Footer from "../components/Footer";
import Car from "./Car/Car";
import Navbar3 from "../components/Navbar3";
import Hotels from "./Hotel/Hotels";
import Flights from "./Flight/Flights";
import Hoteldetails from "./Hotel/HotelDetails";
import CarDetails from "./Car/CarDetails";
export const AllRoutes = () => {
  return (
    <>
      <Navbar3 />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="/hotel" element={<Hotels />} />
        <Route path="/hotel/:id" element={<Hoteldetails />} />
        <Route path="/flight" element={<Flights />} />
        <Route path="/car" element={<Car />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
      <Footer />
    </>
  );
};
