import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { component: Component, ...restOfProps } = props;
  const { loggedin } = useSelector((state) => state.user);
  return (
    <Route
      {...restOfProps}
      render={(props) => (loggedin ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  );
};

export default ProtectedRoute;
