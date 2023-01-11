import { Outlet, useLocation, useParams } from "react-router-dom";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DHLayout } from "@daohaus/connect";

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const location = useLocation();

  // TODO: useDao fetch to hydrate the avatar

  return (
    <DHLayout
      // leftNav={
      //   dao?.name &&
      //   dao?.id && (
      //     <HeaderAvatar
      //       name={dao.name}
      //       address={dao.id}
      //       imgUrl={dao?.avatarImg}
      //     />
      //   )
      // }
      pathname={location.pathname}
      navLinks={[
        { label: "Home", href: `/` },
        {
          label: "TCRs",
          href: `/molochv3/${daochain}/${daoid}`,
        },
      ]}
    >
      <Outlet />
    </DHLayout>
  );
}

export default DaoContainer;
