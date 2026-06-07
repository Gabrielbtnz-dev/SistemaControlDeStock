import { Navigate, Outlet } from "react-router-dom";
import { TokenService } from "./TokenService";

export default function ProtectedRoute() {
  const token = TokenService.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}