import React from "react";
import Navigation from "../Navigation/Navigation";

const NewFilter = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl py-12">
        <Navigation />
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          {/* <h2 className="text-stone-700 text-xl font-bold">Apply filters</h2>
          <p className="mt-1 text-sm">Use filters to further refine search</p> */}
          <div className="mt-8 grid grid-cols-1 gap-0.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-sm font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="raspberry juice"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-7 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-stone-600 text-sm font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="raspberry juice"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-7 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="text-stone-600 text-sm font-medium"
              >
                Date of Entry
              </label>
              <input
                type="date"
                id="date"
                className="mt-2 block w-full rounded-md border border-gray-200 py-[1.18rem] px-7 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="text-stone-600 text-sm font-medium"
              >
                Date of Entry
              </label>
              <input
                type="date"
                id="date"
                className="mt-2 block w-full rounded-md border border-gray-200 py-[1.18rem] px-7 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-stone-600 text-sm font-medium"
              >
                Status
              </label>
              <select
                id="status"
                className="mt-2 block w-full rounded-md border border-gray-200 py-5 px-7 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Dispached Out</option>
                <option>In Warehouse</option>
                <option>Being Brought In</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-x-2">
            <button
              type="submit"
              className="py-3 w-full md:w-1/3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold btn-gradient focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFilter;
