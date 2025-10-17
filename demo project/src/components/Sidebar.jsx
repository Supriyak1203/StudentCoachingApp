import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen">
      <ul className="space-y-3">
        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/profile" className="hover:underline">Profile</Link></li>
        {user.role === "admin" && <li><Link to="/dashboard" className="hover:underline">All Users</Link></li>}
      </ul>
    </aside>
  );
}
