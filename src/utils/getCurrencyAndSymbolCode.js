import { countryCurrencySymbols } from "./countryCurrencySymbols";

function getCurrencyAndSymbolCode(searchValue, searchType) {
  const normalizedSearchValue = searchValue.toLowerCase();

  const entry = countryCurrencySymbols.find((entry) => {
    switch (searchType) {
      case "country":
        return entry.country.toLowerCase() === normalizedSearchValue;
      case "abbreviation":
        return entry.abbreviation.toLowerCase() === normalizedSearchValue;
      default:
        return false;
    }
  });

  if (entry) {
    const currency = entry.currency;
    const symbolCode = entry.symbolCode;
    const abbreviation = entry.abbreviation;
    const country = entry.country;
    return { country, currency, symbolCode, abbreviation };
  } else {
    return null; // No matching entry found
  }
}

export { getCurrencyAndSymbolCode };
