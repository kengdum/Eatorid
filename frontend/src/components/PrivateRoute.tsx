import { useAuth } from "../contexts/AuthContext";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { user, initialLoading } = useAuth();
  const location = useLocation();

  if (initialLoading) return null;

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  return <Outlet />;
}
