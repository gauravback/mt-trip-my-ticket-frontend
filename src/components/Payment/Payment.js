import api from "@/api/api";
import toast from "react-hot-toast";
const handlePaymentVerification = async (response) => {
  console.log(response);
  toast.loading("Please wait...", { id: "1" });
  try {
    const res = await api.post("/api/payment-confirm/", {
      response: response,
    });

    const result = await res.data;
    const status = await res.status;
    if (status === 200) {
      toast.success("payment successful", { id: "1" });
      window.location.href = "/my-trips";
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("server error", { id: "1" });
  }
};

export const showRazorpay = async (
  token,
  packageType,
  packageId,
  promoCode = null,
  person = 1,
  email,
  phone,
  checkin,
  checkout = null
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
      people: person,
      email: email,
      phone: phone,
      start_date: checkin,
      end_date: checkout ? checkout : "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.data;
  var options = {
    key: import.meta.env.VITE_APP_RZP_KEY,
    amount: result.payment.amount,
    currency: result.payment.currency,
    name: "My Trip My Ticket",
    description: "Book you travel now",
    order_id: result.payment.id,
    handler: function (response) {
      handlePaymentVerification(response);
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};
