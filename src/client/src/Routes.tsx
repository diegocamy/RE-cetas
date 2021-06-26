import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Home from "./Home";
import Register from "./pages/Register";

function Routes() {
  return (
    <Router>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
          }}
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={() => <h1>Login</h1>} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default Routes;
