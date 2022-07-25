import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../../contexts/userContext";

function GuestRoute() {
  const { authenticated } = useContext(userContext);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
