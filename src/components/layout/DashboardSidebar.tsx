import getSidebarItems from "@/data/sidebarItems";
import { useUser } from "@/redux/hooks";
import { Sidebar } from "../ui/sidebar";

type Props = {
  sidebarToggler: boolean;
  toggleOpen: () => void;
};

const DashboardSidebar = ({ sidebarToggler, toggleOpen }: Props) => {
  const { role } = useUser()!;

  const sidebarItems = getSidebarItems(role);

  return (
    <div className={sidebarToggler ? "lg:w-[300px]" : "w-[unset]"}>
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
