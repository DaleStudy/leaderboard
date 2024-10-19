import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Certificate from "./components/certificate/certificate";
import ErrorPage from "./components/error-page/error-page";
import Leaderboard from "./components/leaderboard/leaderboard";
import Progress from "./components/progress/progress";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Leaderboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/progress",
    element: <Progress />,
  },
  {
    path: "/certificate",
    element: <Certificate />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
