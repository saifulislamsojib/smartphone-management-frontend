import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

const RootError = () => {
  useTitle("Error");
  const error = useRouteError() as Error | undefined;

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div>
      <h2>Ops!</h2>
      <h4>{error?.message || "Something went wrong!"}</h4>
    </div>
  );
};

export default RootError;
