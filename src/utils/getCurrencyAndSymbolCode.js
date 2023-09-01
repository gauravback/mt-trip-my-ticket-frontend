import { countryCurrencySymbols } from "./countryCurrencySymbols";

function getCurrencyAndSymbolCode(countryName) {
  const entry = countryCurrencySymbols.find(
    (entry) => entry.country === countryName
  );

  if (entry) {
    const currency = entry.currency;
    const symbolCode = entry.symbolCode;
    return { currency, symbolCode };
  } else {
    return null; // Country not found in the array
  }
}

export { getCurrencyAndSymbolCode };
