import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/ui/loading";
import { store } from "./redux/store";
import router from "./routes/router";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </Provider>
  </React.StrictMode>
);
