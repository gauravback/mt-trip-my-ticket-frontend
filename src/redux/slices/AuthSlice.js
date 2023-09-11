import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    token: "",
    email: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action) => {
      return {
        value: {
          token: action.payload.token,
          email: action.payload.email,
        },
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
