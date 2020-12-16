import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
