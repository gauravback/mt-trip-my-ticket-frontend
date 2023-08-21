import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../styles/homePage.css";
import { Offers } from "../components/Offers";
import { HomeSliders } from "../components/HomeSliders";
import $ from "jquery";
import { Footer } from "../components/Footer";
import axios from "axios";
import { cookieStorageManager } from "@chakra-ui/react";
import { HomePageComponent } from "../components/homePageComponent";
import { HomePageComponent2 } from "../components/homePageComponent2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image from "../media/imh.webp"
import "../styles/homeOffers.css";
import cut from "../media/cut.png";
import cut1 from "../media/cut1.png";
import cut2 from "../media/cut2.png";
import cut3 from "../media/cut3.png";
import save from "../media/save.avif";
import save1 from "../media/save1.avif";
import save2 from "../media/save2.avif";
import save3 from "../media/save3.avif";
import save4 from "../media/save4.avif";
import save5 from "../media/save5.avif";
import save6 from "../media/save6.avif";
import save7 from "../media/save7.avif";
import save8 from "../media/save8.avif";
import save9 from "../media/save9.avif";
import save10 from "../media/save10.avif";
import save11 from "../media/save11.avif";
import save12 from "../media/save12.avif";
import save13 from "../media/save13.avif";
import save14 from "../media/save14.avif";


export const HomePage = () => {
  const [whatToShow, setWhatToshow] = useState("flight");
  const handleFlight = () => {
    setWhatToshow("flight");
  };
  const handleHotel = () => {
    setWhatToshow("hotel");
  };

  $(document).on("click", ".iconCard", function () {
    $(".secondHeader > .iconCard").removeClass("active");
    $(this).addClass("active");
  });
  var settings = {
    
    infinite: true,
    autoplay: true,
  autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="homeTop">
        <div className="homeTopCard">
          <div className="secondHeader">
            <Link to="/flight" className="iconCard" onClick={handleFlight}>
              <i className="fa fa-plane"></i>
              <h1>Flight</h1>
            </Link>
            <Link to="/hotel" className="iconCard" onClick={handleHotel}>
              <i className="fa fa-hotel"></i>
              <h1>Hotel</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-home"></i>
              <h1>Home Style</h1>
            </Link>
            {/* <Link to="" className="iconCard">
                <i className="fa fa-balloon"></i>
                <i className="fa fa-car"></i>
                <h1>Holiday Packages</h1>
              </Link> */}
            <Link to="" className="iconCard">
              <i className="fa fa-train"></i>
              <h1>Train</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-bus"></i>
              <h1>Bus</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-car"></i>
              <h1>Car</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-money"></i>
              <h1>Forex</h1>
            </Link>
            <Link to="" className="iconCard">
              <i className="fa fa-plane"></i>
              <h1>Charter Plane</h1>
            </Link>
          </div>
          {/*  */}
          {whatToShow == "flight" ? (
            <HomePageComponent />
          ) : (
            <HomePageComponent2 />
          )}

          {/*  */}
          <div className="homeSearchButtonBx">
            <button>Search</button>
          </div>
        </div>

        {/*  */}
        <div className="homeExplore">
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png"
              alt=""
            />
            <p>Where2Go</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png"
              alt=""
            />
            <p>TripMoney</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png"
              alt=""
            />
            <p>Explore Enternational Flights</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png"
              alt=""
            />
            <p>MICE</p>
          </div>
          <div className="exploreCard">
            <img
              src="https://promos.makemytrip.com/appfest/2x/gift%20card%201.png"
              alt=""
            />
            <p>Gift Cards</p>
          </div>
        </div>
      </div>
    <div className="deg">
      
      <div className="container mt-5">
      <h1 className="had">Dubai Summer Delights</h1>
      <p className="had1"> Create unforgettable memories with your family in Dubai this summer</p>
     <Slider {...settings}>
      <div>
       <div className="slide-card">
           <img src={image} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
 

        
      </div>
      <div>
      <div className="slide-card">
           <img src={save5} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
      </div>
      <div>
      <div className="slide-card">
           <img src={save6} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
      </div>
      <div>
      <div className="slide-card">
           <img src={save12} alt="" />
           <h1 className="text-center mt-2">Skydive Abu Dhabi</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 1600</h2>
             </div>
           </div>
           </div>
           
       </div>
      </div>
      <div>
      <div className="slide-card">
           <img src={save14} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
      </div>
      <div>
      <div className="slide-card">
           <img src={save6} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
      </div>
    </Slider>
    </div>
    </div>
  <div className="weg">
    <div className="container mt-5 mb-5">
      <div className="weg1">
        <h1>Top Cities to Visit</h1>
        <p> Experience the thrill of discovering off-the-beaten-path gems and famous landmarks in top destinations worldwide - your wanderlust awaits!</p>
      </div>
      <div className="row">
   <div className="col-lg-3">
    <div className="dev">
      <img src={cut} alt="" />
    </div>
   </div>
   <div className="col-lg-3">
   <div className="dev">
      <img src={cut1} alt="" />
    </div>
   </div>
   <div className="col-lg-3">
   <div className="dev">
      <img src={cut2} alt="" />
    </div>
   </div>
   <div className="col-lg-3">
   <div className="dev">
      <img src={cut3} alt="" />
    </div>
   </div>
  
   </div>
   

    </div>
    </div>

   <div className="container">
   <div className="weg1">
        <h1>Most Popular Experiences in Dubai</h1>
        <p> Culture, nature, thrills, and record-breaking experiences—Dubai is the place to seek out everything you imagine and beyond. Find it all here!</p>
      </div>
    <div className="d-lg-flex d-block">
<div>
  <div className="slide-card ms-3">
           <img src={save} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save1} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save2} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save3} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save4} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  
  
    </div>

   </div>
   <div className="container">
    <div className="d-lg-flex d-block">
<div>
  <div className="slide-card ms-3">
           <img src={save6} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save7} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save8} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save9} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save10} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  
  
    </div>

   </div>
   <div className="container mt-5">
   <div className="weg1">
        <h1>Top Experiences in Abu Dhabi</h1>
        <p>Discover the best attractions and activities that the UAE's capital city has to offer.</p>
      </div>
    <div className="d-lg-flex d-block">
<div>
  <div className="slide-card ms-3">
           <img src={save11} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save12} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save13} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save14} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save1} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  
  
    </div>

   </div>
   <div className="container">
    <div className="d-lg-flex d-block">
<div>
  <div className="slide-card ms-3">
           <img src={save11} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save10} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save9} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save7} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  <div>
  <div className="slide-card ms-3">
           <img src={save8} alt="" />
           <h1 className="text-center mt-2">Dubai Parks And Resorts</h1>
           <div className="container-fluid mt-5 text-center mb-3">
           <div className="row ">
             <div className="col-lg-6">
                <h2 className="mb-3 ">86 Reviews</h2>
             </div>
             <div className="col-lg-6">
                <h2>AED 275.00</h2>
             </div>
           </div>
           </div>
           
       </div>
  </div>
  
  
    </div>

   </div>
      {/* <Offers  /> */}
      {/* <HomeSliders /> */}
      <Footer />
    </>
  );
};
