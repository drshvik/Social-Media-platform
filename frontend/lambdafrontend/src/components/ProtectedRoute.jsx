import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../tokenUtils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = getToken();

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
