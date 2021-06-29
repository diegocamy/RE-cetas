import { Redirect, Route, RouteProps } from "react-router";

export default function ProtectedRoute({ ...routeProps }: RouteProps) {
  const user = 0;

  if (user < 1) return <Redirect to="/login" />;

  return <Route {...routeProps} />;
}
