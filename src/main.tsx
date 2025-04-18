import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CookiesProvider } from "react-cookie";
import { MainProvider } from "./context/mainProvider.tsx";

import App from "./App.tsx";

import "./styles/global.css";
import "animate.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider
      defaultSetOptions={{
        path: "/", // Cookies accessible across the app
        domain: "localhost",
        secure: false, // Only true when send cookies over HTTPS
        sameSite: "strict", // Prevent CSRF attacks
      }}
    >
      <MainProvider>
        <App />
      </MainProvider>
    </CookiesProvider>
  </StrictMode>
);
