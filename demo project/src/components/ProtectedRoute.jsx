import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.role?.toUpperCase();
  const allowed = allowedRoles.map((r) => r.toUpperCase());

  if (!allowed.includes(userRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">🚫 Access Denied</h2>
          <p className="text-gray-700 mb-6">
            You do not have permission to access this page.
          </p>
          <p className="text-gray-500">
            Your role: <strong>{user.role}</strong>
          </p>
        </div>
      </div>
    );
  }

  return children;
}
