import api from "@/api/api";
import Logo from "../../../public/logo.png";
import toast from "react-hot-toast";

const handlePaymentVerification = async (response) => {
  try {
    const res = await api.post("/api/payment-confirm/", {
      response: response,
    });
    const result = await res.data;
    console.log(result);
    const status = await res.status;
    if (status === 200) {
      toast.success("payment successful", { id: "1" });
      window.location.href = "/dashboard";
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("server error", { id: "1" });
  }
};

export const showRazorpay = async (
  token,
  packageType,
  packageId,
  promoCode = null,
  tickets = 1
) => {
  if (!token) {
    toast.error("Please login first", { id: "1" });
    window.location.href = "/login";
  }
  const response = await api.post(
    "/api/payment/",
    {
      package_type: packageType,
      package_id: packageId,
      promo_code: promoCode,
      tickets: tickets,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.data;
  var options = {
    key: "",
    amount: result.payment.amount,
    currency: result.payment.currency,
    name: "My Trip My Ticket",
    description: "Book you travel now",
    image: Logo,
    order_id: result.payment.id,
    handler: function (response) {
      handlePaymentVerification(response);
    },
    prefill: {
      name: result.user.name,
      email: result.user.email,
      contact: result.user.phone,
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};
