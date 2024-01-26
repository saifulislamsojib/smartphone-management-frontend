import AuthLayout from "@/components/layout/AuthLayout";
import useTitle from "@/hooks/useTitle";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  useTitle("Login");

  return (
    <AuthLayout
      title="Login Your Account"
      description="Please login first to use the Smartphone Management"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
