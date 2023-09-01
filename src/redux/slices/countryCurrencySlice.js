import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: null,
  currency: null,
  symbol: null,
};

const countryCurrencySlice = createSlice({
  name: "countryCurrency",
  initialState,
  reducers: {
    setCountryCurrency: (state, action) => {
      const { country, currency, symbol } = action.payload;
      state.country = country;
      state.currency = currency;
      state.symbol = symbol;
    },
  },
});

export const { setCountryCurrency } = countryCurrencySlice.actions;

export default countryCurrencySlice.reducer;
