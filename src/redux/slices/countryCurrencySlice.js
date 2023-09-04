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
      const { country, currency, symbol, abbreviation } = action.payload;
      state.country = country;
      state.currency = currency;
      state.symbol = symbol;
      state.abbreviation = abbreviation;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
      const countryData = getCurrencyAndSymbolCode(action.payload);
      console.log(countryData.currency);
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setCountryCurrency, setCountry, updateField } =
  countryCurrencySlice.actions;

export default countryCurrencySlice.reducer;
