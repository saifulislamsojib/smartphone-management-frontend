import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Loading from "../ui/loading";

const RootLayout = () => {
  const { state } = useNavigation();

  return (
    <main>
      <ScrollRestoration getKey={({ pathname }) => pathname} />
      {state === "loading" ? <Loading /> : <Outlet />}
    </main>
  );
};

export default RootLayout;
