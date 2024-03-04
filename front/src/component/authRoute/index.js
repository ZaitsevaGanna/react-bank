import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../authContext";

export default function AuthRoute({ element, ...rest }) {
  const { state } = useAuth();
  const { token } = state;

  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" />
  );
}
