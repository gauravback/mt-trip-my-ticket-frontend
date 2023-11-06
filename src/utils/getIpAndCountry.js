import { add } from "@/redux/slices/IPSlice";
import { setCountryCurrency } from "@/redux/slices/countryCurrencySlice";
import axios from "axios";
import Cookies from "js-cookie";
import { getCurrencyAndSymbolCode } from "./getCurrencyAndSymbolCode";

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
      var countryCode = countryResponse.data.countryCode;
      const {
        currency,
        symbolCode,
        abbreviation,
        languageAbbreviation,
        language,
      } = getCurrencyAndSymbolCode(country, "country");

      dispatch(
        setCountryCurrency({
          country,
          currency,
          symbol: symbolCode,
          abbreviation,
        })
      );
      if (
        !Cookies.get("googtrans") === null ||
        (Cookies.get("googtrans") === undefined &&
          !Cookies.get("language") === null) ||
        Cookies.get("language") === undefined
      ) {
        Cookies.set("googtrans", `/en/${languageAbbreviation}`);
        console.log("Language in getCurrencyAndSymbolCode", language);
        Cookies.set("language", language);
      }
      dispatch(add({ ip, countryCode }));
    }
  } catch (error) {
    console.error("Error:", error);
    return "Unknown";
  }
}

export default getIpAndCountry;
