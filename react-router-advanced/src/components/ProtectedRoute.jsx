import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const isAuthenticated = false; // Change to true to test

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
