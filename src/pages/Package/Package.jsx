import api from "@/api/api";
import PackageFilter from "@/components/SearchComponents/PackageFilter/PackageFilter";
import { addToCart } from "@/redux/slices/CartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgDetailsMore } from "react-icons/cg";
import { MdHiking } from "react-icons/md";
import { PiAirplaneBold, PiBus } from "react-icons/pi";
import { RiPhoneLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Package = () => {
  const [packages, setPackages] = useState();
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const rooms = searchParams.get("rooms");
  const withFlights = searchParams.get("withFlights");

  const fetchPackages = async () => {
    try {
      const res = await api.get(
        `/api/packages/?origin_city=${origin ? origin : ""}&destination_city=${
          destination ? destination : ""
        }&activities=&departure_after=${
          departure ? departure : ""
        }&departure_before=&star_category=&price_min=&price_max=&with_flights=${
          withFlights ? withFlights : ""
        }&total_rooms_min=${rooms ? rooms : ""}&total_rooms_max=`
      );
      const data = await res.data;
      const status = await res.status;
      if (status === 200) {
        setPackages(data);
      } else {
        toast.error("Something went wrong.", { id: 1 });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  useEffect(() => {
    fetchPackages();
  }, [location.search]);
  return (
    <div>
      <div className="">
        <PackageFilter />
      </div>
      <div className="flex w-full flex-wrap max-w-[85rem] mx-auto">
        <div className="p-3 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-y-4 gap-6">
            {/* Card */}
            {packages?.map((pkg) => (
              <div key={pkg.id} className="max-w-sm w-full py-6 px-3">
                <div className="bg-white shadow border rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${pkg.image})`,
                    }}
                  ></div>
                  <div className="p-4">
                    <p
                      title={pkg.name}
                      className="truncate uppercase tracking-wide  font-bold text-gray-700"
                    >
                      {pkg.name}
                    </p>
                  </div>
                  <div className="flex space-x-2 p-4 border-t border-gray-300 text-gray-700">
                    <a
                      href={`https://api.whatsapp.com/send?phone=+919804480448&text=${pkg.name}`}
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-0 transition-all text-sm "
                    >
                      <SiWhatsapp fontSize={24} />
                    </a>
                    <a
                      href="tel:+919804480448"
                      className="py-3 w-full md:w-1/2 px-4 inline-flex justify-center items-center gap-2 rounded-full border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm"
                    >
                      <RiPhoneLine fontSize={24} />
                    </a>{" "}
                    <Link to={`/package/${pkg.id}`} className="w-full">
                      <button className="py-3 w-full  px-4 inline-flex justify-center items-center gap-2 rounded-full  font-semibold btn-gradient  focus:outline-none focus:ring-0 focus:ring-blue-200 focus:ring-offset-2 transition-all">
                        <CgDetailsMore fontSize={28} />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* End Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
