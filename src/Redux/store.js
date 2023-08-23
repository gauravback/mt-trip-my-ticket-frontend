import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "data",
  version: 1,
  storage,
};

const reducer = combineReducers({
  authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
