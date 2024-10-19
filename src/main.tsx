import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Certificate from "./components/Certificate/certificate";
import ErrorPage from "./components/ErrorPage/ErrorPage";
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
