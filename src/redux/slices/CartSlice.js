import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const cart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      return action.payload;
    },
    clearCart: (state) => {
      return null;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export default cart.reducer;
