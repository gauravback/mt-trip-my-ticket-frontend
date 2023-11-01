import api from "@/api/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Visa() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Deps",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Rep",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo {Democratic Rep}",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland {Republic}",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea North",
    "Korea South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar, {Burma}",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St Kitts & Nevis",
    "St Lucia",
    "Saint Vincent & the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, country, visaType, traveller } = e.target;

    const data = {
      name: name.value,
      email: email.value,
      country: country.value,
      visa_type: visaType.value,
      traveller: traveller.value,
    };

    try {
      toast.loading("Processing...", { id: "1" });
      const response = await api.post("/api/visa/", data);
      const status = await response.status;

      if (status === 201) {
        toast.success("Your request has been submitted.", { id: "1" });
      } else {
        toast.error("Some error occured", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  return (
    <section
      class="min-h-screen bg-cover "
      style={{
        backgroundImage: `url(
          "/visa-bg.jpg"
        )`,
      }}
    >
      <div class="flex flex-col min-h-screen bg-black/60">
        <div class="container flex flex-col flex-1 px-6 py-12 mx-auto">
          <div class="flex-1 lg:flex lg:items-center lg:-mx-6">
            <div class="text-white lg:w-1/2 lg:mx-6">
              <h1 class="text-2xl font-semibold capitalize lg:text-3xl">
                Apply For Visa
              </h1>

              <p class="max-w-xl mt-6">
                Get your visa for your next holiday, tours and business trips.
              </p>
              <Link to="/contact">
                <button class="px-8 py-3 mt-6 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform btn-gradient rounded-md  focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                  get in touch
                </button>
              </Link>
            </div>

            <div class="mt-8 lg:w-3/4 lg:mx-6">
              <div class="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl lg:max-w-xl">
                <h1 class="text-xl font-medium text-gray-700">
                  Fill the form up
                </h1>

                <p class="mt-2 text-gray-500">
                  Ask us everything and we would love to hear from you.
                </p>

                <form onSubmit={handleSubmit} method="POST" class="mt-6">
                  <div className="md:grid grid-cols-2 gap-3 space-y-4 md:space-y-0">
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Name <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="Name"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Country
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name="country"
                        type="text"
                        required
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option hidden selected value="">
                          Select Country
                        </option>
                        {countries?.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="col-span-2">
                      <label class="block mb-2 text-sm text-gray-600">
                        Email Address{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Visa Type
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name="visaType"
                        type="text"
                        required
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option hidden selected value="">
                          Visa Type
                        </option>
                        <option
                          value="30-days-tourist-visa
"
                        >
                          30 Days Tourist Visa
                        </option>
                        <option value="30-days-tourist-visa(express)">
                          30 Days Tourist Visa (Express)
                        </option>
                        <option value="60-days-tourist-visa">
                          60 Days Tourist Visa
                        </option>
                        <option value="30-dayas-multiple-entry-tourist-visa">
                          30 Dayas Multiple Entry Tourist Visa
                        </option>
                        <option value="48-hours-transit-visa">
                          48 Hours Transit Visa
                        </option>
                        <option value="60-days-job-seeker-visa">
                          60 Days Job Seeker Visa
                        </option>
                      </select>
                    </div>

                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Travellers
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name="traveller"
                        type="text"
                        required
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  <button class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform btn-gradient rounded-md focus:outline-none  focus:ring-0">
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
}

export default Visa;
