import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WagmiConfigProvider } from "@/providers/Wagmi.jsx";
import RootLayout from "./layouts/Layout.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import "chartjs-adapter-date-fns";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfigProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </WagmiConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
