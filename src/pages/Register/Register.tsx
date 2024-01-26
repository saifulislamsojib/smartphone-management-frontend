import AuthLayout from "@/components/layout/AuthLayout";
import useTitle from "@/hooks/useTitle";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  useTitle("Register");

  return (
    <AuthLayout
      title="Register A New Account"
      description="Please register first to use the Smartphone Management"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
