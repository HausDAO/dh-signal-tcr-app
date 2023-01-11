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
import { FormTest } from "./pages/FormTest";
import { Home } from "./pages/Home";
import HomeContainer from "./pages/HomeContainer";
import Dao from "./pages/Dao";
import { CuratedList } from "./pages/CuratedList";

export const Routes = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();
  const location = useLocation();
  const { pathname } = useLocation();
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
    <DHConnectProvider daoChainId={daoChainId}>
      <Router>
        <Route path="/" element={<HomeContainer />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
        </Route>

        <Route path="/molochv3/:daochain/:daoid" element={<DaoContainer />}>
          <Route index element={<Dao />} />
          <Route path="formtest" element={<FormTest />} />
          <Route path="tcr/:tcr" element={<CuratedList />} />
        </Route>
      </Router>
    </DHConnectProvider>
  );
};
