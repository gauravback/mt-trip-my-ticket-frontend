import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ip: "",
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
        ip: action.payload,
      };
    },
  },
});

export const { add, remove } = ipAddress.actions;
export default ipAddress.reducer;
