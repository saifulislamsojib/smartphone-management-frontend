import DashboardLayout from "@/components/layout/DashboardLayout";
import RootLayout from "@/components/layout/RootLayout";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import NotFoundPage from "@/pages/NotFound";
import RegisterPage from "@/pages/Register/Register";
import RootError from "@/pages/RootError";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "dashboard",

        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
