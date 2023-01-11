import { DHLayout, useDHConnect } from "@daohaus/connect";
import { Outlet, useLocation } from "react-router-dom";

export function HomeContainer() {
  const location = useLocation();

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[{ label: "Home", href: `/` }]}
    >
      <Outlet />
    </DHLayout>
  );
}

export default HomeContainer;
