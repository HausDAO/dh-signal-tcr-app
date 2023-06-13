import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { HausThemeProvider } from "@daohaus/ui";

import { Routes } from "./Routes";
import { HAUS_RPC } from "@daohaus/keychain-utils";
import { DHConnectProvider } from "@daohaus/connect";
import { TARGET_DAO } from "./targetDao";

const queryClient = new QueryClient();

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://${process.env.NX_RIVET_KEY}.eth.rpc.rivet.cloud/`,
        5: `https://${import.meta.env.VITE_RIVET_KEY}.goerli.rpc.rivet.cloud/`,
        10: `https://mainnet.optimism.io`,
        100: HAUS_RPC["0x64"],
      },
    },
  },
};

export const web3modalOptions = {
  cacheProvider: true,
  providerOptions,
  theme: "dark",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <DHConnectProvider
          web3modalOptions={web3modalOptions}
          daoChainId={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
        >
          <HausThemeProvider>
            <Routes />
          </HausThemeProvider>
        </DHConnectProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
