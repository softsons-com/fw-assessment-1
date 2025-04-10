import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/styles.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/states/theme/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
