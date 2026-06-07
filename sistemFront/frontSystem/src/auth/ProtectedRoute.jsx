import { TokenService } from "./TokenService";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const token = TokenService.getToken();

  console.log("TOKEN:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}