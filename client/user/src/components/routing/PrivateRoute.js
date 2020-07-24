import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { authToken } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !authToken ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
