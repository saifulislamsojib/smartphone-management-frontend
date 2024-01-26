import { Toaster } from "@/components/ui/sonner";
import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import { initialLoading, login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const skip = !localStorage.getItem("jwt-token");

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const { data, error } = useCurrentUserQuery(undefined, { skip });

  useEffect(() => {
    if (data?.data) {
      dispatch(
        login({ token: localStorage.getItem("jwt-token")!, user: data?.data })
      );
    } else if (error) {
      dispatch(initialLoading());
      console.log(error);
    }
  }, [data, dispatch, error]);

  useEffect(() => {
    if (skip) {
      dispatch(initialLoading());
    }
  }, [dispatch]);

  return (
    <>
      <main>
        <Outlet />
        <Toaster duration={2000} position="top-center" />
      </main>
      <ScrollRestoration getKey={({ pathname }) => pathname} />
    </>
  );
};

export default RootLayout;
