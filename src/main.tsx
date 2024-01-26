import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/ui/loading";
import router from "./routes/router";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>
);
