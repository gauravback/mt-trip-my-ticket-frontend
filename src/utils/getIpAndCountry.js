import { setCountryCurrency } from "@/redux/slices/countryCurrencySlice";
import axios from "axios";
import { getCurrencyAndSymbolCode } from "./getCurrencyAndSymbolCode";
import { useSelector } from "react-redux";
import { add } from "@/redux/slices/IPSlice";

async function getIpAndCountry(dispatch, ipAddress = null) {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;

    if (!ip || ip != ipAddress) {
      const countryResponse = await axios.get(`http://ip-api.com/json/${ip}`);
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
