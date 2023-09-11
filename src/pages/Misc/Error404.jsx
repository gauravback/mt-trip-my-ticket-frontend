import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <main className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
        <div className=" px-2 text-sm rounded bg-white rotate-12 absolute">
          Page Not Found
        </div>
        <div className="mt-5">
          <Link to="/">
            <button className="inline-block text-sm font-medium  group focus:outline-none focus:ring">
              <span className="block px-8 py-3 bg-white border border-gray-600 rounded-md">
                Go Home
              </span>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Error404;
