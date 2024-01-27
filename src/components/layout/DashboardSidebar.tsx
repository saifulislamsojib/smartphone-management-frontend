import { ClipboardList, Layers3, TextSearch } from "lucide-react";
import { Sidebar, SidebarNavItem } from "../ui/sidebar";

const sidebarItems: SidebarNavItem[] = [
  {
    title: "Smartphone Management",
    href: "/dashboard/smartphone-management",
    icon: ClipboardList,
  },
  {
    title: "Sales Management",
    href: "/dashboard/sales-management",
    icon: TextSearch,
  },
  {
    title: "Sales History",
    href: "/dashboard/sales-history",
    icon: Layers3,
  },
];

type Props = {
  sidebarToggler: boolean;
  toggleOpen: () => void;
};

const DashboardSidebar = ({ sidebarToggler, toggleOpen }: Props) => {
  return (
    <div
      className={sidebarToggler ? "lg:w-full lg:max-w-[300px]" : "w-[unset]"}
    >
      <Sidebar
        items={sidebarItems}
        title="Smartphone Management"
        isOpen={sidebarToggler}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};

export default DashboardSidebar;
