import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Certificate from "./pages/Certificate/Certificate";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Certificate />
  </StrictMode>,
);
