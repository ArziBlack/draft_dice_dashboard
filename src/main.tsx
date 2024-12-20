import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { StoreProvider } from "easy-peasy";
import store from "./store/store.ts";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <App />
          <Toaster/>
        </TooltipProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
