import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Make from "./pages/Make";
import Setup from "./pages/Setup";
import Score from "./pages/Score";
import Logout from "./pages/Logout";
import Choice from "./pages/Choice";

function App() {
  return (
    <Router>
      <div>
        <div className="container">
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/choice" exact>
              <Choice />
            </Route>
            <Route path="/make/:min/:max" exact>
              <Make />
            </Route>
            <Route path="/setup/:color/:p" exact>
              <Setup />
            </Route>
            <Route path="/score" exact>
              <Score />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
