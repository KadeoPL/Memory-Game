import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./index.css";
import WelcomeScreen from "./routes/WelcomeScreen";
import GameScreen from "./routes/GameScreen";
import SelectLevel from "./routes/SelectLevel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/game",
    element: <GameScreen />,
  },
  {
    path: "/select-level",
    element: <SelectLevel />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
