import { setCountryCurrency } from "@/redux/slices/countryCurrencySlice";
import axios from "axios";
import { getCurrencyAndSymbolCode } from "./getCurrencyAndSymbolCode";
import { add } from "@/redux/slices/IPSlice";

async function getIpAndCountry(dispatch, ipAddress = null) {
  try {
    axios.defaults.ssl = false;
    const response = await fetch(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=baa6fc321104453db3aa6a8c5991dfc9"
    );

    const data = await response.json();
    const ip = data.ip_address;
    if (!ip || ip != ipAddress) {
      const countryResponse = await axios.get(
        `https://ip-country-checker.vercel.app/${ip}`
      );
      const country = countryResponse.data.country;
      const { currency, symbolCode, abbreviation } = getCurrencyAndSymbolCode(
        country,
        "country"
      );

      dispatch(
        setCountryCurrency({
          country,
          currency,
          symbol: symbolCode,
          abbreviation,
        })
      );
    }
    dispatch(add(ip));
  } catch (error) {
    console.error("Error:", error);
    return "Unknown";
  }
}

export default getIpAndCountry;
