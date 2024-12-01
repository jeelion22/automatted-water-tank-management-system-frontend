import "./PrivateRoute.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  selectCurrentUser,
  selectCurrentUserError,
  selectCurrentUserStatus,
} from "../../features/users/userSlice";
import Spinner from "../spinner/Spinner";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectCurrentUserStatus);
  const error = useSelector(selectCurrentUserError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (status === "loading" || status === "idle") {
    return <Spinner />;
  }

  if (status === "failed" || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="private-container">
      {children} <Outlet />
    </div>
  );
};

export default PrivateRoute;
