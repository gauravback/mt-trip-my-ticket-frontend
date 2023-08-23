import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "./Redux/Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ReduxProvider>
);
