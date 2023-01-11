import { useEffect, useState } from "react";
import {
  Routes as Router,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import { DHConnectProvider, DHLayout } from "@daohaus/connect";
import { Create } from "./pages/Create";
import DaoContainer from "./pages/DaoContainer";
import { Explore } from "./pages/Explore";
import { Home } from "./pages/Home";
import HomeContainer from "./pages/HomeContainer";
import Dao from "./pages/Dao";
import { CuratedList } from "./pages/CuratedList";
import {
  HAUS_NETWORK_DATA,
  Keychain,
  NetworkConfig,
} from "@daohaus/keychain-utils";

const SupportedNetworks: Keychain<NetworkConfig> = {
  "0x5": HAUS_NETWORK_DATA["0x5"],
};

export const Routes = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();
  const location = useLocation();
  const pathMatch = matchPath("molochv3/:daochain/:daoid/*", location.pathname);

  useEffect(() => {
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (daoChainId && !pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId, daoChainId]);

  return (
    <DHConnectProvider daoChainId={daoChainId} networks={SupportedNetworks}>
      <Router>
        <Route path="/" element={<HomeContainer />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Route>

        <Route path="/molochv3/:daochain/:daoid" element={<DaoContainer />}>
          <Route index element={<Dao />} />
          <Route path="create" element={<Create />} />
          <Route path="tcr/:tcr" element={<CuratedList />} />
        </Route>
      </Router>
    </DHConnectProvider>
  );
};
