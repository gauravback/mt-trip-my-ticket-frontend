import { setCountryCurrency } from "@/redux/slices/countryCurrencySlice";
import axios from "axios";
import { getCurrencyAndSymbolCode } from "./getCurrencyAndSymbolCode";

async function getIpAndCountry(dispatch, country) {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ip = response.data.ip;

    const countryResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    const country = countryResponse.data.country;
    const { currency, symbolCode, abbreviation } =
      getCurrencyAndSymbolCode(country);

    dispatch(
      setCountryCurrency({
        country,
        currency,
        symbol: symbolCode,
        abbreviation,
      })
    );
  } catch (error) {
    console.error("Error:", error);
    return "Unknown";
  }
}

export default getIpAndCountry;
