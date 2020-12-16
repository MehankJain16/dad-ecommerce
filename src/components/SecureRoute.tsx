import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface SecureRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const SecureRoute: React.FC<SecureRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !currentUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default SecureRoute;
