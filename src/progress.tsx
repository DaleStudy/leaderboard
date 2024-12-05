import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout/Layout";
import Progress from "./components/Progress/Progress";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Progress />
    </Layout>
  </StrictMode>,
);
