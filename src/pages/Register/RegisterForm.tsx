import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ErrorResponse } from "@/types/common.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const [authRegister] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast("loading...");
    const res = await authRegister(data);
    if ("data" in res) {
      toast("Account register successfully!", { id: toastId });
      const { data } = res.data || {};
      localStorage.setItem("jwt-token", data.token);
      dispatch(login(data));
      navigate("/dashboard", { replace: true });
    } else {
      const err = (res.error as ErrorResponse)?.data?.errorMessage;
      toast(err || "Account register failed!", { id: toastId });
      console.log(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4 mb-3">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-500 mx-1">Name is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your Email"
            {...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500 mx-1">
              Valid email is required
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your Password"
            {...register("password", {
              required: true,
              validate: (value) =>
                value.trim().length >= 8 ||
                "Password must be at least 8 characters long",
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500 mx-1">
              {errors.password.message || "Password is required"}
            </span>
          )}
        </div>
      </div>
      <Button type="submit" className="ml-auto block">
        Register
      </Button>
      <p className="text-sm mx-1 text-center mt-3">
        Already have an account ?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
