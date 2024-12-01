import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/userSlice";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfLoggedIn = ({ redirectPath = "/dashboard" }) => {
  const user = useSelector(selectCurrentUser);

  if (user) <Navigate to={redirectPath} />;

  return <Outlet />;
};

export default RedirectIfLoggedIn;
