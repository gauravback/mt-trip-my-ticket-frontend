import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const offer = createSlice({
  name: "offer",
  initialState: initialState,
  reducers: {
    addOffer: (state, action) => {
      return action.payload;
    },
    clearOffer: (state) => {
      return "";
    },
  },
});

export const { addOffer, clearOffer } = offer.actions;
export default offer.reducer;
