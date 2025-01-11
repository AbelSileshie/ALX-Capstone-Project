import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/common/Routes.jsx";
import Error500 from "./components/error/Error500.jsx";
import { Spiner } from "./components/layout/Spiner.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create an instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spiner />}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
