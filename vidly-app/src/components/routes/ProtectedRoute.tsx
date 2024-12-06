import { ReactNode } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import auth from "../../services/authService";

type ProtectedRouteProps = RouteProps & {
  redirectTo: string;
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={!auth.getCurrentUser() ? <Navigate to={redirectTo} /> : children}
    />
  );
};

export default ProtectedRoute;
