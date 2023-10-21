import api from "@/api/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cartReducer);
  const offerCode = useSelector((state) => state.OfferReducer);
  const currencySymbol = useSelector(
    (state) => state.countryCurrencyReducer?.symbol
  );
  const priceRate = useSelector((state) => state.currencyRateReducer?.rate);
  const [error, setError] = useState(false);
  const [showMessage, setShowmessage] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const token = useSelector((state) => state.authReducer?.value?.token);
  const [discount, setDiscount] = useState(0);
  const [disableCouponInput, setDisableCouponInput] = useState(false);

  const checkCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(
        `/api/check-offer/${e.target.coupon?.value}/`
      );
      const result = await response.data;
      const status = await response.status;

      if (status === 200) {
        setDiscount(result.discount_percent);
        setDisableCouponInput(true);
        setShowmessage(true);
        setError(false);
        setCouponCode(result?.code);
      } else {
        setShowmessage(true);
        setError(true);
      }
    } catch (error) {
      if (error) {
        setShowmessage(true);
        setError(true);
      }
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { checkoutEmail, phone, checkin, person } = e.target;
      const response = await api.post(
        "/api/payment/",
        {
          token,
          package_type: cart.type,
          package_id: cart.id,
          promo_code: couponCode,
          people: person.value,
          email: checkoutEmail.value,
          phone: phone.value,
          start_date: checkin.value,
          end_date: e.target.checkout ? e.target.checkout.value : "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      const status = await response.status;
      if (status === 200) {
        window.open(result.url);
      } else {
        toast.error("Something went wrong", { id: 1 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: 1 });
    }
  };
  return (
    <div>
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="rounded-lg ">
            <div className="p-6 ">
              <div className="w-full sm:w-3/4 mx-auto">
                <div className="pb-6">
                  <h2 className="text-xl font-bold text-gray-800 md:text-3xl">
                    Checkout
                  </h2>
                </div>
                <div className="my-4">
                  <form
                    onSubmit={checkCoupon}
                    method="POST"
                    className="flex w-full sm:max-w-md items-center space-x-2"
                  >
                    <div className="w-full">
                      <input
                        type="text"
                        name="coupon"
                        id="coupon"
                        defaultValue={offerCode ? offerCode : ""}
                        placeholder="Coupon Code"
                        className={`p-2 border rounded-md w-full focus:outline-none focus:ring-0 ${
                          disableCouponInput ? "pointer-events-none" : ""
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-gradient py-2 px-4 rounded-md"
                    >
                      Apply
                    </button>
                  </form>
                  {showMessage &&
                    (error ? (
                      <p
                        className={`my-3 text-sm ${
                          error ? "error" : "success"
                        }`}
                      >
                        Coupon Code is invalid
                      </p>
                    ) : (
                      <p
                        className={`my-3 text-sm ${
                          error ? "error" : "success"
                        }`}
                      >
                        Coupon has been applied
                      </p>
                    ))}
                </div>
              </div>
              <form
                onSubmit={handlePayment}
                method="POST"
                className="w-full sm:w-3/4 mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="checkoutEmail"
                      name="checkoutEmail"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="">
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
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="checkin"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Check In Date
                    </label>
                    <input
                      type="date"
                      id="checkin"
                      name="checkin"
                      min={
                        cart?.minDate
                          ? cart?.minDate
                          : new Date().toISOString().slice(0, 10)
                      }
                      max={cart?.maxDate}
                      defaultValue={
                        cart?.minDate
                          ? cart?.minDate
                          : new Date().toISOString().slice(0, 10)
                      }
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                      required
                    />
                  </div>
                  {(cart?.type === "hotel" || cart?.type === "car") && (
                    <div className="">
                      <label
                        htmlFor="checkout"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        CheckOut Date
                      </label>
                      <input
                        type="date"
                        id="checkout"
                        name="checkout"
                        min={
                          cart?.minDate
                            ? cart?.minDate
                            : new Date().toISOString().slice(0, 10)
                        }
                        max={cart?.maxDate}
                        defaultValue={cart?.maxDate}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                      />
                    </div>
                  )}

                  <div className="">
                    <label
                      htmlFor="person"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Person
                    </label>
                    <select
                      type="text"
                      id="person"
                      name="person"
                      defaultValue={"1"}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                      required
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

                <div>
                  <div className="my-10">
                    <div className="px-10 py-3  rounded-md dark:bg-gray-800">
                      <div className="flex justify-between dark:text-gray-400">
                        <p className="font-medium">Subtotal</p>
                        <p className="font-bold ">
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {parseFloat(
                            (cart?.price ? cart.price : 0) * priceRate
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="px-10 py-3 rounded-md">
                      <div className="flex justify-between dark:text-gray-400">
                        <p className="font-medium">Discount</p>
                        <p className="font-bold ">
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {(cart.price * priceRate).toFixed(2) -
                            parseFloat(
                              (cart?.price - (discount * cart?.price) / 100) *
                                priceRate
                            ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="px-10 py-3 rounded-full dark:text-gray-400">
                      <div className="flex justify-between">
                        <p className="text-base font-bold md:text-xl ">
                          Order Total
                        </p>
                        <p className="font-bold ">
                          <span
                            dangerouslySetInnerHTML={{ __html: currencySymbol }}
                          ></span>
                          {cart.price
                            ? parseFloat(
                                (cart?.price - (discount * cart?.price) / 100) *
                                  priceRate
                              ).toFixed(2)
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="inline-block w-full px-8 py-4 font-bold text-center uppercase transition duration-200  rounded-md md:w-auto btn-gradient">
                      Pay Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
