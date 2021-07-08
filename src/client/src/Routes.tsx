import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ConfirmAccount from "./pages/ConfirmAccount";
import Login from "./pages/Login";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Protected from "./pages/Protected";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/me" component={Me} />
        <PrivateRoute path="/protected" component={Protected} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/user/confirm-account/:token" component={ConfirmAccount} />
        <Route path="/user/reset-password/:token" component={ResetPassword} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
