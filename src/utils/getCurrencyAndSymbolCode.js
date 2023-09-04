import { countryCurrencySymbols } from "./countryCurrencySymbols";

function getCurrencyAndSymbolCode(countryName) {
  const entry = countryCurrencySymbols.find(
    (entry) => entry.country === countryName
  );

  if (entry) {
    const currency = entry.currency;
    const symbolCode = entry.symbolCode;
    const abbreviation = entry.abbreviation;
    return { currency, symbolCode, abbreviation };
  } else {
    return null; // Country not found in the array
  }
}

export { getCurrencyAndSymbolCode };
