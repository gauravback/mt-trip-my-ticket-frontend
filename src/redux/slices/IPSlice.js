import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ip: "",
  countryCode: "",
};

export const ipAddress = createSlice({
  name: "ipAddress",
  initialState: initialState,
  reducers: {
    remove: () => {
      return initialState;
    },
    add: (state, action) => {
      return {
        ip: action.payload.ip,
        countryCode: action.payload.countryCode,
      };
    },
  },
});

export const { add, remove } = ipAddress.actions;
export default ipAddress.reducer;
