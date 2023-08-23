import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Tours = () => {
  const token = useSelector((state) => state.authReducer?.value?.token);
  const [tours, setTours] = useState();
  const fetchTours = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/tours/`
    );
    const result = await response.json();
    const status = await response.status;

    if (status === 200) {
      setTours(result);
    } else {
      toast.error("Something went wrong.", { id: "1" });
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const url = form.action;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: new FormData(form),
      });
      const result = await response.json();
      const status = await response.status;

      if (status === 200) {
        window.location.href = result.url;
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch {
      toast.error("Something went wrong", { id: "1" });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl  font-bold text-gray-900">Tours</h2>
        </div>
        {tours && (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
            {/* Card */}
            {tours.map((tour) => (
              <div key={tour.id} className="flex bg-white transition">
                <div className="hidden sm:block sm:basis-56">
                  <img
                    alt={tour.title}
                    src={tour.image}
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <h3 className="font-bold uppercase text-gray-900">
                      {tour.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                      {tour.description}
                    </p>
                  </div>
                  <div className="sm:flex sm:items-end sm:justify-end">
                    <form
                      action={`${
                        import.meta.env.VITE_APP_API_URL
                      }/api/payment/`}
                      method="post"
                      onSubmit={handleSubmit}
                    >
                      <input
                        hidden
                        type="text"
                        name="package_type"
                        defaultValue="tour"
                        id=""
                      />
                      <input
                        hidden
                        type="text"
                        name="package_id"
                        defaultValue={tour.id}
                        id=""
                      />
                      <button className="block bg-blue-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-blue-400 rounded-md">
                        Book Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}

            {/* Card End */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
