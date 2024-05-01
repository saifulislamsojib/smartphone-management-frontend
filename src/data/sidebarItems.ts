import { SidebarNavItem } from "@/components/ui/sidebar";
import { Role } from "@/types/user.type";
import { ClipboardList, Layers3, TextSearch } from "lucide-react";

const sidebarItems: SidebarNavItem[] = [
  {
    title: "Smartphone Management",
    href: "/dashboard/smartphone-management",
    icon: ClipboardList,
    accessRoles: ["super-admin", "manager"],
  },
  {
    title: "Sales Management",
    href: "/dashboard/sales-management",
    icon: TextSearch,
    accessRoles: ["super-admin", "seller"],
  },
  {
    title: "Sales History",
    href: "/dashboard/sales-history",
    icon: Layers3,
    accessRoles: ["super-admin"],
  },
];

const getSidebarItems = (items: SidebarNavItem[]) => (role: Role) => {
  return items.reduce((acc, cur) => {
    if (cur.accessRoles.includes(role)) {
      if (cur.items?.length) {
        cur.items = getSidebarItems(cur.items)(role);
      }
      acc.push(cur);
    }
    return acc;
  }, [] as SidebarNavItem[]);
};

export default getSidebarItems(sidebarItems);
