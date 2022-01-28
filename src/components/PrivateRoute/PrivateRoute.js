import React from "react";
import './PrivateRoute.css';
import { Navigate, useLocation } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";

const PrivateRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const { user, isLoading } = useFirebase();

  if (isLoading) {
    return (
      <div className="loader">
        <span className="span"></span>
        <span className="span"></span>
        <span className="span"></span>
        <span className="span"></span>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
