import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 1. If no token, kick them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If the role doesn't match (e.g., USER trying to access ADMIN), kick to home
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // 3. Otherwise, render the child routes (the dashboard)
  return <Outlet />;
};

export default ProtectedRoute;