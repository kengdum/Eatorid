import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { UIProvider } from "./contexts/UIContext";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <UIProvider>
          <RestaurantsProvider>
            <App />
          </RestaurantsProvider>
        </UIProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
