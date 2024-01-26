import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTitle from "@/hooks/useTitle";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  useTitle("Login");

  return (
    <div className="flex items-center min-h-screen">
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Login Your Account</CardTitle>
          <CardDescription>
            Please login first to use the Smartphone Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
