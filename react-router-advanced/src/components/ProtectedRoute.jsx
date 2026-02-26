import { Navigate } from "react-router-dom";

const isAuthenticated = false; // Change to true to test

function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
