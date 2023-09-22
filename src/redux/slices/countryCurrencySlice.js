import { countryCurrencySymbols } from "@/utils/countryCurrencySymbols";
import { getCurrencyAndSymbolCode } from "@/utils/getCurrencyAndSymbolCode";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: null,
  currency: null,
  symbol: null,
  abbreviation: null,
};

const countryCurrencySlice = createSlice({
  name: "countryCurrency",
  initialState,
  reducers: {
    setCountryCurrency: (state, action) => {
      const { country, currency, symbol, abbreviation, langauge } =
        action.payload;
      state.country = country;
      state.currency = currency;
      state.symbol = symbol;
      state.abbreviation = abbreviation;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
      const countryData = getCurrencyAndSymbolCode(action.payload, "country");
      state.currency = countryData.currency;
      state.symbol = countryData.symbolCode;
      state.abbreviation = countryData.abbreviation;
    },
    setCurrency: (state, action) => {
      state.abbreviation = action.payload;
      const currencyData = getCurrencyAndSymbolCode(
        action.payload,
        "abbreviation"
      );
      state.currency = currencyData.currency;
      state.symbol = currencyData.symbolCode;
    },
  },
});

export const { setCountryCurrency, setCountry, setCurrency } =
  countryCurrencySlice.actions;

export default countryCurrencySlice.reducer;
