import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "./redux/Provider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <ScrollToTop />
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ReduxProvider>
);
