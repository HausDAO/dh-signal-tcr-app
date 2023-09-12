import { Routes as Router, Route } from "react-router-dom";
import { Create } from "./pages/Create";
import HomeContainer from "./pages/HomeContainer";
import Dao from "./pages/Dao";
import { SignalList } from "./pages/SignalList";
import { AddChoice } from "./pages/AddChoice";
import { Daos } from "./pages/Daos";
import SelectDao from "./pages/SelectDao";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Daos />} />
      <Route path="/selectDao" element={<SelectDao />} />
      <Route path="/:chainid/:daoid/" element={<HomeContainer />}>
        <Route index element={<Dao />} />

        <Route path="create" element={<Create />} />
        <Route path="tcr/:tcr" element={<SignalList />} />
        <Route path="tcr/:tcr/add-choice/" element={<AddChoice />} />

      </Route>
    </Router>
  );
};
