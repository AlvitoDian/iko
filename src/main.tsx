import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FireworksProvider } from "./contexts/ConditionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FireworksProvider>
      <App />
    </FireworksProvider>
  </StrictMode>
);
