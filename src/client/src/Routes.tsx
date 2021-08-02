import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ConfirmAccount from "./pages/ConfirmAccount";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipe";
import NotFound from "./pages/NotFound";
import EditRecipe from "./pages/EditRecipe";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" component={Profile} />
        <PrivateRoute path="/new" component={CreateRecipe} />
        <PrivateRoute path="/edit/:slug" component={EditRecipe} />
        <PrivateRoute path="/followers" component={Followers} />
        <PrivateRoute path="/following" component={Following} />
        <PrivateRoute path="/recipes" component={Recipes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/search" component={Search} />
        <Route path="/recipe/:slug" component={Recipe} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/user/confirm-account/:token" component={ConfirmAccount} />
        <Route path="/user/reset-password/:token" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
