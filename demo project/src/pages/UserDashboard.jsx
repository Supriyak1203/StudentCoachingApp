import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { user, token, logout } = useAuth();
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/users/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMyData(data))
        .catch((err) => console.error(err));
    }
  }, [token, user]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-green-800 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8 text-center">User Portal</h2>
        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-green-600">
            📊 Dashboard
          </button>
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
        >
          🚪 Sign Out
        </button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.email}</h1>

        <section>
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          {myData ? (
            <div className="bg-white rounded-lg shadow p-4">
              <p><strong>Name:</strong> {myData.name}</p>
              <p><strong>Email:</strong> {myData.email}</p>
              <p><strong>Role:</strong> {myData.role}</p>
            </div>
          ) : (
            <p>Loading your data...</p>
          )}
        </section>
      </main>
    </div>
  );
}
