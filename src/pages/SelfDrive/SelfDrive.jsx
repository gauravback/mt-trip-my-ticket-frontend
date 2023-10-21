import api from "@/api/api";
import React from "react";
import toast from "react-hot-toast";

const SelfDrive = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: 1 });
    try {
      const {
        name,
        email,
        phone,
        car,
        fromDate,
        toDate,
        fromCity,
        toCity,
        license,
        notes,
      } = e.target;
      const response = await api.post("/api/self-drive/", {
        car: car.value,
        name: name.value,
        email: email.value,
        phone_number: phone.value,
        from_date: fromDate.value,
        to_date: toDate.value,
        driver_license_number: license.value,
        from_location: fromCity.value,
        to_location: toCity.value,
        notes: notes.value,
      });
      const status = await response.status;
      const result = await response.data;
      if (status === 201) {
        toast.success("Your request has been submitted.", { id: 1 });
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  return (
    <section
      className="min-h-screen bg-cover "
      style={{ background: `url("/self-drive-bg.jpg")` }}
    >
      <div className="flex flex-col min-h-screen bg-black/80">
        <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
          <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
            <div className="text-white lg:w-1/2 lg:mx-6">
              <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
                About Our Self-Drive Service
              </h1>
              <p className="max-w-xl mt-6">
                Explore the freedom of our self-drive rental service. Whether
                you're planning a weekend getaway or a long road trip, we've got
                you covered. Choose from a wide range of vehicles, from compact
                cars to spacious SUVs. Drive at your own pace and enjoy the
                journey with the assurance of quality vehicles and 24/7 support.
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>Explore the freedom of self-drive rental.</li>
                <li>
                  Wide range of vehicle options, from compact cars to spacious
                  SUVs.
                </li>
                <li>Drive at your own pace and enjoy the journey.</li>
                <li>Quality vehicles and 24/7 customer support.</li>
              </ul>
            </div>
            <div className="mt-8 lg:w-3/4 lg:mx-6">
              <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl lg:max-w-xl">
                <h1 className="text-xl font-medium text-gray-700">
                  Self-Drive Rental
                </h1>
                <p className="mt-2 text-gray-500">
                  Fill out the form below, and we'll get back to you.
                </p>
                <form onSubmit={handleSubmit} method="POST" className="mt-6">
                  <div className="md:grid grid-cols-2 gap-3 space-y-4 md:space-y-0">
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        Name <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        Email Address
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        Phone Number{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        Car <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="car"
                        name="car"
                        placeholder="Car"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        From Date{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        id="fromDate"
                        name="fromDate"
                        placeholder="Name"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        To Date{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        id="toDate"
                        name="toDate"
                        placeholder="Name"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        From City{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="fromCity"
                        name="fromCity"
                        placeholder="From City"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="">
                      <label className="block mb-2 text-sm text-gray-600">
                        To City{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="toCity"
                        name="toCity"
                        placeholder="To City"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm text-gray-600">
                        Driving License Number
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="license"
                        name="license"
                        placeholder="Driving License Number"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm text-gray-600">
                        Additonal Message
                      </label>
                      <textarea
                        type="text"
                        id="notes"
                        name="notes"
                        placeholder="Additional Message"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform btn-gradient rounded-md focus:outline-none  focus:ring-0"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfDrive;
