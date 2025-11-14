import { useAuth } from "../../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
}
