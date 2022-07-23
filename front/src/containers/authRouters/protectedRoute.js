import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../../contexts/userContext";

function ProtectedRoute() {
  const { authenticated } = useContext(userContext);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
