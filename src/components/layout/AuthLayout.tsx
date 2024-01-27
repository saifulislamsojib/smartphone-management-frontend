import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const AuthLayout = ({ children, title, description }: Props) => {
  const { token, loading } = useAuth();

  return (
    <>
      {loading ? (
        <Loading />
      ) : token ? (
        <Navigate to="/dashboard/smartphone-management" replace />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-[400px] mx-auto">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
