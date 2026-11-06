import React from "react";
import "./index.css";
import router from "../routes/Router";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
