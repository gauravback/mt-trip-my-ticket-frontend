import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import countryCurrencyReducer from "./slices/countryCurrencySlice";
import IPReducer from "./slices/IPSlice";
import currencyRateReducer from "./slices/currencyRateSlice";
import cartReducer from "./slices/CartSlice";
import OfferReducer from "./slices/OfferSlice";
const persistConfig = {
  key: "data",
  version: 1,
  storage,
};

const reducer = combineReducers({
  authReducer,
  countryCurrencyReducer,
  IPReducer,
  currencyRateReducer,
  cartReducer,
  OfferReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
