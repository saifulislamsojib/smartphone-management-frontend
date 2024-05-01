import { useAuth } from "@/redux/hooks";
import { Role } from "@/types/user.type";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../ui/loading";

type Props = {
  children: ReactNode;
  accessRoles: Role[] | "all" | "none";
};

const ProtectedRoute = ({ children, accessRoles }: Props) => {
  const { loading, token, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (
    accessRoles !== "all" &&
    (accessRoles === "none" || !accessRoles.includes(user!.role))
  ) {
    return (
      <Navigate
        to={`/dashboard/${
          user!.role === "seller" ? "sales-management" : "smartphone-management"
        }`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
