import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { AuthContext } from "../App";

export default function ProtectedRoute({ ...routeProps }: RouteProps) {
  const { user } = useContext(AuthContext);

  if (!user) return <Redirect to="/login" />;

  return <Route {...routeProps} />;
}
