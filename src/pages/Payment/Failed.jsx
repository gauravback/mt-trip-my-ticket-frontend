import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../components/Lottie/payment_failed.json";
import { useNavigate } from "react-router-dom";
const Failed = () => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) {
      navigate("/my-trips");
    } else {
      const countdown = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => {
        clearTimeout(countdown);
      };
    }
  }, [count]);
  return (
    <div className="py-8">
      <Lottie options={defaultOptions} height={450} width={450} />
      <h1 className="text-center text-4xl font-semibold">Payment Failed</h1>
      <p className="text-center text-2xl mt-3">
        Redirecting in {count} Seconds
      </p>
    </div>
  );
};

export default Failed;
