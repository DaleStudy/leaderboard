import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout/Layout";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Leaderboard />
    </Layout>
  </StrictMode>,
);
