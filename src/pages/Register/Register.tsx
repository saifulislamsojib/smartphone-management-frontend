import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTitle from "@/hooks/useTitle";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  useTitle("Register");

  return (
    <div className="flex items-center min-h-screen">
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Register A New Account</CardTitle>
          <CardDescription>
            Please register first to use the Smartphone Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
