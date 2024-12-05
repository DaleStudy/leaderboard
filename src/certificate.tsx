import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Certificate from "./components/Certificate/Certificate";
import Layout from "./components/Layout/Layout";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Certificate />
    </Layout>
  </StrictMode>,
);
