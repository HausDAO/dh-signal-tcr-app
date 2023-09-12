import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { HausThemeProvider } from "@daohaus/ui";

import { Routes } from "./Routes";
import { HAUS_RPC } from "@daohaus/keychain-utils";
import { DHConnectProvider } from "@daohaus/connect";
import { TARGET_DAO } from "./targetDao";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <DHConnectProvider>
          <HausThemeProvider>
            <Routes />
          </HausThemeProvider>
        </DHConnectProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
