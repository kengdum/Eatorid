import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { UIProvider } from "./contexts/UIContext";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider
          theme={{
            colorScheme: "dark",
            colors: {
              brand: [
                "#fff0f6",
                "#ffdeeb",
                "#fcc2d7",
                "#faa2c1",
                "#f783ac",
                "#f06595",
                "#e64980",
                "#d6336c",
                "#c2255c",
                "#a61e4d",
              ],
            },
            primaryColor: "brand",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <UIProvider>
            <AuthProvider>
              <RestaurantsProvider>
                <App />
              </RestaurantsProvider>
            </AuthProvider>
          </UIProvider>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
