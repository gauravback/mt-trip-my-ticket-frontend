import api from "@/api/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Forex() {
  const [action, setAction] = useState("buy");
  console.log(action);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      location,
      currency,
      quantity,
      purposeOfVisit,
      bookingCurrencyFor,
      amount,
    } = e.target;

    const data = {
      name: name.value,
      email: email.value,
      location: location.value,
      currency: currency.value,
      quantity: quantity.value,
      purpose_of_visit: purposeOfVisit.value,
      booking_currency_for: bookingCurrencyFor.value,
      amount: amount.value,
      action: action,
    };

    try {
      toast.loading("Processing...", { id: "1" });
      const response = await api.post("/api/forex/create/", data);
      const status = await response.status;
      console.log(response);
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
          "/forex-bg.jpg"
        )`,
      }}
    >
      <div class="flex flex-col min-h-screen bg-black/60">
        <div class="container flex flex-col flex-1 px-6 py-12 mx-auto">
          <div class="flex-1 lg:flex lg:items-center lg:-mx-6">
            <div class="text-white lg:w-1/2 lg:mx-6">
              <h1 class="text-2xl font-semibold capitalize lg:text-3xl">
                Buy / Sell Forex
              </h1>

              <p class="max-w-xl mt-6">
                Navigate the Global Markets with Precision: Our Comprehensive
                Forex Trading Platform Empowers You to Buy and Sell Currencies
                Strategically, Maximizing Your Financial Potential Safely and
                Effectively.
              </p>
              <Link to="/contact">
                <button class="px-8 py-3 mt-6 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform btn-gradient rounded-md  focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                  get in touch
                </button>
              </Link>

              <div class="mt-6 md:mt-8">
                <h3 class="text-gray-300 ">Follow us</h3>

                <div class="flex mt-4 -mx-1.5 ">
                  <a
                    class="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                    href="#"
                  >
                    <svg
                      class="w-10 h-10 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                    </svg>
                  </a>

                  <a
                    class="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                    href="#"
                  >
                    <svg
                      class="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>

                  <a
                    class="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                    href="#"
                  >
                    <svg
                      class="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>

                  <a
                    class="mx-1.5 text-white transition-colors duration-300 transform hover:text-blue-500"
                    href="#"
                  >
                    <svg
                      class="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>
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
                  <div className="grid sm:grid-cols-2 gap-2 my-5">
                    <button
                      type="button"
                      onClick={() => {
                        setAction("buy");
                      }}
                      className={` ${
                        action === "buy"
                          ? "btn-gradient"
                          : "bg-white border border-gray-300"
                      } px-3 py-2 rounded-md`}
                    >
                      BUY
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAction("sell");
                      }}
                      className={`${
                        action === "sell"
                          ? "btn-gradient"
                          : "bg-white border border-gray-300"
                      } px-3 py-2 rounded-md`}
                    >
                      SELL
                    </button>
                  </div>

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
                        Phone Number{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Location{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="location"
                        name="location"
                        placeholder="Location"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Currency{" "}
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        type="text"
                        name="currency"
                        required
                        defaultValue=""
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option value="" hidden>
                          Select Currency
                        </option>
                        <option value="AFN">Afghan Afghani</option>
                        <option value="ALL">Albanian Lek</option>
                        <option value="DZD">Algerian Dinar</option>
                        <option value="AOA">Angolan Kwanza</option>
                        <option value="ARS">Argentine Peso</option>
                        <option value="AMD">Armenian Dram</option>
                        <option value="AWG">Aruban Florin</option>
                        <option value="AUD">Australian Dollar</option>
                        <option value="AZN">Azerbaijani Manat</option>
                        <option value="BSD">Bahamian Dollar</option>
                        <option value="BHD">Bahraini Dinar</option>
                        <option value="BDT">Bangladeshi Taka</option>
                        <option value="BBD">Barbadian Dollar</option>
                        <option value="BYR">Belarusian Ruble</option>
                        <option value="BEF">Belgian Franc</option>
                        <option value="BZD">Belize Dollar</option>
                        <option value="BMD">Bermudan Dollar</option>
                        <option value="BTN">Bhutanese Ngultrum</option>
                        <option value="BTC">Bitcoin</option>
                        <option value="BOB">Bolivian Boliviano</option>
                        <option value="BAM">
                          Bosnia-Herzegovina Convertible Mark
                        </option>
                        <option value="BWP">Botswanan Pula</option>
                        <option value="BRL">Brazilian Real</option>
                        <option value="GBP">British Pound Sterling</option>
                        <option value="BND">Brunei Dollar</option>
                        <option value="BGN">Bulgarian Lev</option>
                        <option value="BIF">Burundian Franc</option>
                        <option value="KHR">Cambodian Riel</option>
                        <option value="CAD">Canadian Dollar</option>
                        <option value="CVE">Cape Verdean Escudo</option>
                        <option value="KYD">Cayman Islands Dollar</option>
                        <option value="XOF">CFA Franc BCEAO</option>
                        <option value="XAF">CFA Franc BEAC</option>
                        <option value="XPF">CFP Franc</option>
                        <option value="CLP">Chilean Peso</option>
                        <option value="CNY">Chinese Yuan</option>
                        <option value="COP">Colombian Peso</option>
                        <option value="KMF">Comorian Franc</option>
                        <option value="CDF">Congolese Franc</option>
                        <option value="CRC">Costa Rican ColÃ³n</option>
                        <option value="HRK">Croatian Kuna</option>
                        <option value="CUC">Cuban Convertible Peso</option>
                        <option value="CZK">Czech Republic Koruna</option>
                        <option value="DKK">Danish Krone</option>
                        <option value="DJF">Djiboutian Franc</option>
                        <option value="DOP">Dominican Peso</option>
                        <option value="XCD">East Caribbean Dollar</option>
                        <option value="EGP">Egyptian Pound</option>
                        <option value="ERN">Eritrean Nakfa</option>
                        <option value="EEK">Estonian Kroon</option>
                        <option value="ETB">Ethiopian Birr</option>
                        <option value="EUR">Euro</option>
                        <option value="FKP">Falkland Islands Pound</option>
                        <option value="FJD">Fijian Dollar</option>
                        <option value="GMD">Gambian Dalasi</option>
                        <option value="GEL">Georgian Lari</option>
                        <option value="DEM">German Mark</option>
                        <option value="GHS">Ghanaian Cedi</option>
                        <option value="GIP">Gibraltar Pound</option>
                        <option value="GRD">Greek Drachma</option>
                        <option value="GTQ">Guatemalan Quetzal</option>
                        <option value="GNF">Guinean Franc</option>
                        <option value="GYD">Guyanaese Dollar</option>
                        <option value="HTG">Haitian Gourde</option>
                        <option value="HNL">Honduran Lempira</option>
                        <option value="HKD">Hong Kong Dollar</option>
                        <option value="HUF">Hungarian Forint</option>
                        <option value="ISK">Icelandic KrÃ³na</option>
                        <option value="INR">Indian Rupee</option>
                        <option value="IDR">Indonesian Rupiah</option>
                        <option value="IRR">Iranian Rial</option>
                        <option value="IQD">Iraqi Dinar</option>
                        <option value="ILS">Israeli New Sheqel</option>
                        <option value="ITL">Italian Lira</option>
                        <option value="JMD">Jamaican Dollar</option>
                        <option value="JPY">Japanese Yen</option>
                        <option value="JOD">Jordanian Dinar</option>
                        <option value="KZT">Kazakhstani Tenge</option>
                        <option value="KES">Kenyan Shilling</option>
                        <option value="KWD">Kuwaiti Dinar</option>
                        <option value="KGS">Kyrgystani Som</option>
                        <option value="LAK">Laotian Kip</option>
                        <option value="LVL">Latvian Lats</option>
                        <option value="LBP">Lebanese Pound</option>
                        <option value="LSL">Lesotho Loti</option>
                        <option value="LRD">Liberian Dollar</option>
                        <option value="LYD">Libyan Dinar</option>
                        <option value="LTL">Lithuanian Litas</option>
                        <option value="MOP">Macanese Pataca</option>
                        <option value="MKD">Macedonian Denar</option>
                        <option value="MGA">Malagasy Ariary</option>
                        <option value="MWK">Malawian Kwacha</option>
                        <option value="MYR">Malaysian Ringgit</option>
                        <option value="MVR">Maldivian Rufiyaa</option>
                        <option value="MRO">Mauritanian Ouguiya</option>
                        <option value="MUR">Mauritian Rupee</option>
                        <option value="MXN">Mexican Peso</option>
                        <option value="MDL">Moldovan Leu</option>
                        <option value="MNT">Mongolian Tugrik</option>
                        <option value="MAD">Moroccan Dirham</option>
                        <option value="MZM">Mozambican Metical</option>
                        <option value="MMK">Myanmar Kyat</option>
                        <option value="NAD">Namibian Dollar</option>
                        <option value="NPR">Nepalese Rupee</option>
                        <option value="ANG">
                          Netherlands Antillean Guilder
                        </option>
                        <option value="TWD">New Taiwan Dollar</option>
                        <option value="NZD">New Zealand Dollar</option>
                        <option value="NIO">Nicaraguan CÃ³rdoba</option>
                        <option value="NGN">Nigerian Naira</option>
                        <option value="KPW">North Korean Won</option>
                        <option value="NOK">Norwegian Krone</option>
                        <option value="OMR">Omani Rial</option>
                        <option value="PKR">Pakistani Rupee</option>
                        <option value="PAB">Panamanian Balboa</option>
                        <option value="PGK">Papua New Guinean Kina</option>
                        <option value="PYG">Paraguayan Guarani</option>
                        <option value="PEN">Peruvian Nuevo Sol</option>
                        <option value="PHP">Philippine Peso</option>
                        <option value="PLN">Polish Zloty</option>
                        <option value="QAR">Qatari Rial</option>
                        <option value="RON">Romanian Leu</option>
                        <option value="RUB">Russian Ruble</option>
                        <option value="RWF">Rwandan Franc</option>
                        <option value="SVC">Salvadoran ColÃ³n</option>
                        <option value="WST">Samoan Tala</option>
                        <option value="SAR">Saudi Riyal</option>
                        <option value="RSD">Serbian Dinar</option>
                        <option value="SCR">Seychellois Rupee</option>
                        <option value="SLL">Sierra Leonean Leone</option>
                        <option value="SGD">Singapore Dollar</option>
                        <option value="SKK">Slovak Koruna</option>
                        <option value="SBD">Solomon Islands Dollar</option>
                        <option value="SOS">Somali Shilling</option>
                        <option value="ZAR">South African Rand</option>
                        <option value="KRW">South Korean Won</option>
                        <option value="XDR">Special Drawing Rights</option>
                        <option value="LKR">Sri Lankan Rupee</option>
                        <option value="SHP">St. Helena Pound</option>
                        <option value="SDG">Sudanese Pound</option>
                        <option value="SRD">Surinamese Dollar</option>
                        <option value="SZL">Swazi Lilangeni</option>
                        <option value="SEK">Swedish Krona</option>
                        <option value="CHF">Swiss Franc</option>
                        <option value="SYP">Syrian Pound</option>
                        <option value="STD">São Tomé and Príncipe Dobra</option>
                        <option value="TJS">Tajikistani Somoni</option>
                        <option value="TZS">Tanzanian Shilling</option>
                        <option value="THB">Thai Baht</option>
                        <option value="TOP">Tongan pa'anga</option>
                        <option value="TTD">Trinidad & Tobago Dollar</option>
                        <option value="TND">Tunisian Dinar</option>
                        <option value="TRY">Turkish Lira</option>
                        <option value="TMT">Turkmenistani Manat</option>
                        <option value="UGX">Ugandan Shilling</option>
                        <option value="UAH">Ukrainian Hryvnia</option>
                        <option value="AED">United Arab Emirates Dirham</option>
                        <option value="UYU">Uruguayan Peso</option>
                        <option value="USD">US Dollar</option>
                        <option value="UZS">Uzbekistan Som</option>
                        <option value="VUV">Vanuatu Vatu</option>
                        <option value="VEF">Venezuelan BolÃ­var</option>
                        <option value="VND">Vietnamese Dong</option>
                        <option value="YER">Yemeni Rial</option>
                        <option value="ZMK">Zambian Kwacha</option>
                      </select>
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Quantity
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        name="quantity"
                        step="1"
                        pattern="\d*"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Purpose of visit
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name="purposeOfVisit"
                        type="text"
                        required
                        placeholder="Location"
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option value="personal-visit">Personal Visit</option>
                        <option value="overseas-education">
                          Overseas Education
                        </option>
                        <option value="business-travel">Business Travel</option>
                        <option value="employment">Employment</option>
                        <option value="medical-visit">Medical Visit</option>
                      </select>
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Booking Currency for
                        <span className="text-red-600 font-bold">*</span>
                      </label>
                      <select
                        name="bookingCurrencyFor"
                        type="text"
                        required
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      >
                        <option value="myself">Myself</option>
                        <option value="spouse">Spouse</option>
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="parents">Parents</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="grand-daughter">Grand Daughter</option>
                        <option value="grand-son">Grand Son</option>
                      </select>
                    </div>
                    <div class="">
                      <label class="block mb-2 text-sm text-gray-600">
                        Amount<span className="text-red-600 font-bold">*</span>
                      </label>
                      <input
                        name="amount"
                        required
                        type="number"
                        min={1}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform btn-gradient rounded-md focus:outline-none  focus:ring-0">
                    Get Quote
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

export default Forex;
