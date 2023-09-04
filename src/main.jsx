import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "./redux/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <Suspense fallback="loading">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </ReduxProvider>
);
