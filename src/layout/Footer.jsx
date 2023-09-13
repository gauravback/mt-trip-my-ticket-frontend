import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <div>
      <div className="mx-auto  max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="md:flex items-center justify-center md:justify-between">
          <div className="flex space-x-6 justify-center md:justify-normal">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <BsFacebook fontSize={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <BsTwitter fontSize={26} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <BsInstagram fontSize={26} />
            </a>
          </div>
          <div className="space-y-4 xl:ml-auto mt-7 md:mt-0">
            <div className="flex items-center justify-center md:justify-end flex-wrap gap-x-3">
              <h1 className="text-sm md:text-base font-medium text-center mb-2">
                We Accept:
              </h1>
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">
                <img
                  className="h-4 md:h-6"
                  src="/visa.png"
                  alt="Company name"
                />
                <img
                  className="h-5 md:h-8"
                  src="/mastercard.png"
                  alt="Company name"
                />
                <img
                  className="h-5 md:h-8"
                  src="/diners-club.png"
                  alt="Company name"
                />
                <img
                  className="h-5 md:h-8"
                  src="/american-express.png"
                  alt="Company name"
                />
                <img
                  className="h-4 md:h-6"
                  src="/rupay.png"
                  alt="Company name"
                />
                <img className="h-4 md:h-6" src="/UPI.svg" alt="Company name" />
              </div>
            </div>
            <div className="md:flex items-center gap-x-3 justify-end">
              <h1 className="text-sm md:text-base font-medium text-center mb-2">
                Powered By:
              </h1>
              <div className="flex items-center justify-center">
                <img
                  className="h-6 md:h-8 justify-center md:justify-end"
                  src="/razorpay.png"
                  alt="Company name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            Copyright © 2023 My Trip My Ticket, All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
