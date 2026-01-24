import PageNotFound from "components/commons/PageNotFound";
import History from "components/History";
import ShowMovies from "components/MovieList";
import { Route, Switch } from "react-router-dom";
import routes from "routes";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact component={ShowMovies} path={routes.root} />
    <Route exact component={History} path={routes.history} />
    <Route exact component={PageNotFound} path="*" />
  </Switch>
);

export default App;
