import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  toggleSidebar: () => void;
  sidebarToggler: boolean;
};

const DashboardNavbar = ({ toggleSidebar, sidebarToggler }: Props) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    dispatch(logout());
    toast.success("Logout successfully!", { duration: 500000 });
  };

  return (
    <div
      className={`h-14 flex justify-between items-center mr-5 lg:mr-10 px-5 bg-slate-100${
        sidebarToggler ? "" : " ml-5 lg:ml-10"
      }`}
    >
      <Menu onClick={toggleSidebar} className="cursor-pointer" />{" "}
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardNavbar;
