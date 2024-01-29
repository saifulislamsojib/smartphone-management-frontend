import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const [sidebarToggler, setSidebarToggler] = useState(() => {
    const toggle = localStorage.getItem("sidebarToggler");
    return toggle ? JSON.parse(toggle) === true : true;
  });
  const toggleSidebar = () => {
    setSidebarToggler((pre) => {
      const toggle = !pre;
      localStorage.setItem("sidebarToggler", JSON.stringify(toggle));
      return !pre;
    });
  };

  return (
    <div className="flex">
      <DashboardSidebar
        sidebarToggler={sidebarToggler}
        toggleOpen={toggleSidebar}
      />
      <div
        className={sidebarToggler ? "w-full lg:w-[calc(100%-300px)]" : "w-full"}
      >
        <DashboardNavbar
          sidebarToggler={sidebarToggler}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`ml-5 mr-5 lg:mr-10 mt-5${
            sidebarToggler ? "" : " lg:mx-10"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
