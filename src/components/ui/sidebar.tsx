import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: SidebarNavItem[];
    }
);

export interface SidebarNavProps {
  items: SidebarNavItem[];
  title?: string;
  isOpen?: boolean;
  toggleOpen?: () => void;
}

const Sidebar = ({
  items,
  title,
  isOpen = true,
  toggleOpen,
}: SidebarNavProps) => {
  return (
    <div
      className={`w-full max-w-[300px] bg-slate-200 min-h-screen p-2 top-0 absolute transition-left duration-300 ${
        isOpen ? "left-0" : "-left-full"
      }`}
    >
      <div className="flex items-center justify-between mb-5 mt-2">
        {title && (
          <h2 className="px-2 font-bold text-lg text-indigo-700">{title}</h2>
        )}
        <Menu onClick={toggleOpen} className="cursor-pointer lg:hidden" />
      </div>
      {items.map((item, idx) => (
        <SidebarNavItem key={idx} item={item} />
      ))}
    </div>
  );
};

interface SidebarNavItemProps {
  item: SidebarNavItem;
}

function SidebarNavItem({ item }: SidebarNavItemProps) {
  return (
    <>
      {item.disabled ? (
        <span className="flex w-full cursor-not-allowed items-center mb-1 font-medium rounded-md p-2 opacity-60">
          {item.icon && <item.icon className="mr-2" />} {item.title}
        </span>
      ) : item.href ? (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex w-full items-center rounded-md p-2 font-medium hover:text-indigo-800 mb-1 transition-colors",
              {
                "bg-muted text-indigo-700 shadow": isActive,
              }
            )
          }
          target={item.external ? "_blank" : ""}
          rel={item.external ? "noreferrer" : ""}
          end
        >
          {item.icon && <item.icon className="mr-2" />} {item.title}
        </NavLink>
      ) : (
        <h4 className="mb-1 rounded-md px-2 py-1 font-medium hover:text-indigo-800 transition-colors">
          {item.icon && <item.icon className="mr-2" />} {item.title}
        </h4>
      )}
      {item.items?.map((item, idx) => (
        <SidebarNavItem key={idx} item={item} />
      ))}
    </>
  );
}

export { Sidebar };
