import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Progress from "./components/progress/progress";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Progress />
  </StrictMode>,
);
