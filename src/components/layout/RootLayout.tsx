import { useCurrentUserQuery } from "@/redux/features/auth/authApi";
import { initialLoading, login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const skip = !localStorage.getItem("jwt-token");

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const { data } = useCurrentUserQuery(undefined, { skip });

  useEffect(() => {
    if (data?.data) {
      dispatch(
        login({ token: localStorage.getItem("jwt-token")!, user: data?.data })
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (skip) {
      dispatch(initialLoading());
    }
  }, [dispatch]);

  return (
    <main>
      <ScrollRestoration getKey={({ pathname }) => pathname} />
      <Outlet />
    </main>
  );
};

export default RootLayout;
