import { DHLayout, useDHConnect } from "@daohaus/connect";
import { HAUS_RPC } from "@daohaus/keychain-utils";
import { TXBuilder } from "@daohaus/tx-builder";
import { H1, H4 } from "@daohaus/ui";
import { Outlet, useLocation } from "react-router-dom";
import { useDao } from "../hooks/useDao";
import { TARGET_DAO } from "../targetDao";

export function HomeContainer() {
  const location = useLocation();
  const { provider, address } = useDHConnect();
  const { dao } = useDao({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[{ label: "Home", href: `/` }]}
      leftNav={<H4>PublicHAUS</H4>}
    >
      <TXBuilder
        provider={provider}
        chainId={TARGET_DAO.CHAIN_ID}
        daoId={TARGET_DAO.ADDRESS}
        safeId={TARGET_DAO.SAFE_ADDRESS}
        appState={{ dao, memberAddress: address }}
        rpcs={{
          "0x1": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.eth.rpc.rivet.cloud/`,
          "0x5": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.goerli.rpc.rivet.cloud/`,
          "0x64": HAUS_RPC["0x64"],
        }}
        explorerKeys={{
          "0x1": import.meta.env.VITE_EXPLORER_KEY,
          "0x5": import.meta.env.VITE_EXPLORER_KEY,
        }}
      >
        <Outlet />
      </TXBuilder>
    </DHLayout>
  );
}

export default HomeContainer;
