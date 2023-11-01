import api from "@/api/api";
import React from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const response = await api.post("/api/contact/", {
        name: e.target.name.value,
        phone_number: e.target.phone.value,
        email: e.target.email.value,
        message: e.target.message.value,
      });
      const status = await response.status;
      if (status === 201) {
        toast.success("Your query has been submitted.", { id: "1" });
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  return (
    <div>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-600 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form method="POST" onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block p-3 w-full text-sm text-gray-900  rounded-lg border border-gray-300  focus:outline-none focus:0"
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="block p-3 w-full text-sm text-gray-900  rounded-lg border border-gray-300  focus:outline-none focus:0"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none  block w-full p-2.5"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                name="message"
                required
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-0"
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg btn-gradient w-full  focus:ring-0 focus:outline-none"
            >
              Submit
            </button>
          </form>
          <div className="mt-12 grid sm:grid-cols-2  items-center">
            <div className="flex flex-col h-full text-center rounded-md  p-4 sm:p-6">
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  Booking Queries
                </h3>

                <a
                  href="mailto:booking@taketotrip.com"
                  className="mt-1 inline-flex items-center gap-x-2 font-medium text-blue-600"
                >
                  booking@taketotrip.com
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full text-center rounded-md  p-4 sm:p-6">
              <div className="grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  Technical Support
                </h3>

                <a
                  href="mailto:support@taketotrip.com"
                  className="mt-1 inline-flex items-center gap-x-2 font-medium text-blue-600"
                >
                  support@taketotrip.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
