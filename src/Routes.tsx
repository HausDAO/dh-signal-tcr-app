import { Routes as Router, Route } from "react-router-dom";
import { Create } from "./pages/Create";
import HomeContainer from "./pages/HomeContainer";
import Dao from "./pages/Dao";
import { CuratedList } from "./pages/CuratedList";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route index element={<Dao />} />
        <Route path="create" element={<Create />} />
        <Route path="tcr/:tcr" element={<CuratedList />} />
      </Route>
    </Router>
  );
};
