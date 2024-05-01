import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import RootLayout from "@/components/layout/RootLayout";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import SalesHistory from "@/pages/Dashboard/SalesHistory/SalesHistory";
import SalesManagement from "@/pages/Dashboard/SalesManagement/SalesManagement";
import SmartphoneManagement from "@/pages/Dashboard/SmartphoneManagement/SmartphoneManagement";
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
        element: (
          <ProtectedRoute accessRoles="all">
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute accessRoles="none">
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "smartphone-management",
            element: (
              <ProtectedRoute accessRoles={["super-admin", "manager"]}>
                <SmartphoneManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "sales-management",
            element: (
              <ProtectedRoute accessRoles={["super-admin", "seller"]}>
                <SalesManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "sales-history",
            element: (
              <ProtectedRoute accessRoles={["super-admin"]}>
                <SalesHistory />
              </ProtectedRoute>
            ),
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
