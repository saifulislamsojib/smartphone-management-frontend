import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const [sidebarToggler, setSidebarToggler] = useState(true);
  const toggleSidebar = () => setSidebarToggler((pre) => !pre);

  return (
    <div className="flex">
      <DashboardSidebar
        sidebarToggler={sidebarToggler}
        toggleOpen={toggleSidebar}
      />
      <div className="w-full">
        <DashboardNavbar
          sidebarToggler={sidebarToggler}
          toggleSidebar={toggleSidebar}
        />
        <div className={`mx-5 mt-5${sidebarToggler ? "" : " lg:mx-10"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
