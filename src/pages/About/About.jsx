import React from "react";

const About = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="">
          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="max-w-[85rem] mx-auto prose">
              <h1>About MyTripMyTicket</h1>
              <p>Welcome to MyTripMyTicket!</p>
              <p>
                At MyTripMyTicket, we are dedicated to making your travel dreams
                a reality. Whether you're planning a relaxing vacation, a
                business trip, or an adventure of a lifetime, we've got you
                covered. Our goal is to provide you with a seamless and
                stress-free booking experience for all your travel needs,
                including flight tickets, hotel accommodations, bus tickets, car
                rentals, and incredible holiday travel packages.
              </p>
              <div>
                <img
                  className="rounded-xl mx-auto"
                  src="/about.jpg"
                  width={550}
                  alt="Image Description"
                />
              </div>
              <h2>Why Choose Us?</h2>
              <ul>
                <li>
                  <strong>One-Stop Travel Shop:</strong> We believe in
                  simplifying travel planning. Gone are the days of bouncing
                  between multiple websites to book different aspects of your
                  journey. With MyTripMyTicket, you can book everything you need
                  in one place, saving you time and effort.
                </li>
                <li>
                  <strong>Best Price Guarantee:</strong> We understand that
                  budget is a crucial factor when planning your travels. That's
                  why we work tirelessly to offer you competitive prices on all
                  our services. You can trust us to provide the best deals
                  available.
                </li>
                <li>
                  <strong>Wide Selection:</strong> Our platform offers an
                  extensive selection of flights, hotels, bus routes, car rental
                  options, and holiday packages. We collaborate with a network
                  of trusted partners to give you diverse choices to suit your
                  preferences and requirements.
                </li>
                <li>
                  <strong>User-Friendly Interface:</strong> Navigating our
                  website is a breeze. We've designed it with you in mind,
                  ensuring that you can effortlessly browse and book your travel
                  essentials with just a few clicks.
                </li>
                <li>
                  <strong>Customer Support:</strong> Travel can sometimes be
                  unpredictable, and we understand that you might need
                  assistance along the way. Our dedicated customer support team
                  is available to help you 24/7, ensuring that your journey is
                  smooth from start to finish.
                </li>
                <li>
                  <strong>Secure Booking:</strong> Your safety and security are
                  paramount to us. We use the latest technology to protect your
                  personal and payment information, giving you peace of mind
                  when booking with us.
                </li>
                <li>
                  <strong>Travel Inspiration:</strong> Our blog and travel
                  guides are packed with useful tips, destination
                  recommendations, and travel inspiration to help you plan the
                  perfect trip.
                </li>
              </ul>
              <p>
                So, whether you're seeking a romantic get away, a family
                adventure, or a business trip, let MyTripMyTicket be your
                trusted travel companion. We're here to turn your travel dreams
                into unforgettable experiences. Start exploring our website
                today, and let the journey begin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
