import { useAuth } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../ui/loading";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { loading, token } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
