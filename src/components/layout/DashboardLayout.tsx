import useTitle from "@/hooks/useTitle";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  useTitle("Dashboard");

  return (
    <div>
      <h1>DashboardLayout</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
