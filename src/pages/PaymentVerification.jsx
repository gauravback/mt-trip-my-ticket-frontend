import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PaymentVerification = () => {
  const [message, setMessage] = useState();
  const { id } = useParams();
  const verifyPayment = async () => {
    setMessage("Checking payment status...");
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/payment-confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: id,
        }),
      }
    );
    const status = await response.status;
    const result = await response.json();
    console.log(result);

    if (status === 200) {
      setMessage("Payment Successful");
    } else if (status === 400) {
      setMessage("Payment Failed");
    } else {
      setMessage("Invalid Booking Id");
    }
  };

  useEffect(() => {
    if (id) {
      verifyPayment();
    }
  }, [id]);
  return (
    <div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
              {message}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
