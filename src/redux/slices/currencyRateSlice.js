import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rate: "",
};

export const currencyRate = createSlice({
  name: "currencyRate",
  initialState: initialState,
  reducers: {
    remove: () => {
      return initialState;
    },
    add: (state, action) => {
      return {
        rate: action.payload,
      };
    },
  },
});

export const { add, remove } = currencyRate.actions;
export default currencyRate.reducer;
