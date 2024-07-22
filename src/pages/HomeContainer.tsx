import { DHLayout, useDHConnect } from "@daohaus/connect";
import { HAUS_RPC, ValidNetwork } from "@daohaus/keychain-utils";
import { TXBuilder } from "@daohaus/tx-builder";
import { H1, H4 } from "@daohaus/ui";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDao } from "../hooks/useDao";
import { TARGET_DAO } from "../targetDao";
import { EthAddress } from "@daohaus/utils";

export function HomeContainer() {
  const location = useLocation();
  const { publicClient, address } = useDHConnect();
  const { chainid, daoid } = useParams();
  const { dao } = useDao({
    daoId: daoid as EthAddress,
    chainId: chainid as ValidNetwork,
  });

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[{ label: "Home", href: `/` }]}
      leftNav={<H4>{dao?.name}</H4>}
    >
      <TXBuilder
        publicClient={publicClient}
        chainId={chainid}
        daoId={daoid}
        safeId={
          dao?.safeAddress ||
          (TARGET_DAO[daoid as EthAddress] &&
            TARGET_DAO[daoid as EthAddress].SAFE_ADDRESS) ||
          ""
        }
        appState={{ dao, memberAddress: address }}
        rpcs={{
          "0x1": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.eth.rpc.rivet.cloud/`,
          "0x5": `https://${
            import.meta.env.VITE_RIVET_KEY
          }.goerli.rpc.rivet.cloud/`,
          "0xa": `https://mainnet.optimism.io`,
          "0x64": HAUS_RPC["0x64"],
        }}
        explorerKeys={{
          "0x1": import.meta.env.VITE_EXPLORER_KEY,
          "0x5": import.meta.env.VITE_EXPLORER_KEY,
          "0xa": import.meta.env.VITE_EXPLORER_KEY,
        }}
        graphApiKeys={{
          "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
          "0xa":  import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
          "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
        }}
      >
        <Outlet />
      </TXBuilder>
    </DHLayout>
  );
}

export default HomeContainer;
