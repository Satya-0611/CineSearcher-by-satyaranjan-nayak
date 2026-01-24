import PageNotFound from "components/commons/PageNotFound";
import History from "components/History";
import { Route, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";
import MovieListPage from "./pages/MovieListPage";

const App = () => (
  <Switch>
    <Route exact component={MovieListPage} path={routes.root} />
    <Route exact component={History} path={routes.history} />
    <Route exact component={PageNotFound} path="*" />
  </Switch>
);

export default App;
