import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {QueryClientProvider} from "@tanstack/react-query";
import { queryClient } from '@/api/query';
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
