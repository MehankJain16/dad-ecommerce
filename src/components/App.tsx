import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SecureRoute from "./SecureRoute";
import Home from "./Home";
import Signin from "./Signin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <SecureRoute path="/signup" exact component={Signup} />
          <SecureRoute path="/signin" exact component={Signin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
