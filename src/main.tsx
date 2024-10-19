import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Certificate from "./certificate";
import ErrorPage from "./error-page";
import "./index.css";
import Leaderboard from "./leaderboard";
import Progress from "./progress";

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
