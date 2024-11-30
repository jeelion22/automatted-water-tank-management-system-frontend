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
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectCurrentUserStatus);
  const error = useSelector(selectCurrentUserError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
