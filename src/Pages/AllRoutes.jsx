import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Admin } from "./Admin/AdminFlight";
import { AdminHotel } from "./Admin/AdminHotel";
import { AdminLandingPage } from "./Admin/adminLandingPage";
import { AdminProducts } from "./Admin/AdminProducts";
import { AllHotels } from "./Admin/AllHotels";
import { Cart } from "./booking/Cart";

import Flights from "./Flights/Flight";

import { HomePage } from "./HomePage";
import Hotel from "./Hotel/Hotel";
import HotelDetails from "./Hotel/HotelDetails";
import Login from "./Login";
import Register from "./Register";
import Footer from "../components/Footer";
import Car from "./Car/Car";
import Navbar2 from "../components/Navbar2";
export const AllRoutes = () => {
  return (
    <>
      <Navbar2 />
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
          path="/car"
          element={
            <>
              <Car />
            </>
          }
        />
        <Route
          path="/hotel"
          element={
            <>
              <Hotel />
            </>
          }
        />
        <Route
          path="hotel/:id"
          element={
            <>
              <HotelDetails />
            </>
          }
        />
        <Route
          path="/flight"
          element={
            <>
              <Flights />
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
        <Route
          path="/cart"
          element={
            <>
              <Cart />
            </>
          }
        />

        <Route path="/admin/adminhotel" element={<AdminHotel />} />
        <Route path="/admin/adminflight" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/hotels" element={<AllHotels />} />
        <Route path="/admin" element={<AdminLandingPage />} />
      </Routes>
      <Footer />
    </>
  );
};
