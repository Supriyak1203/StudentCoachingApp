import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/users", { // endpoint returning all users
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setAllUsers(data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const menuItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "students", label: "🎓 Manage Students" },
    { id: "teachers", label: "👩‍🏫 Manage Teachers" },
    { id: "courses", label: "📘 Courses" },
    { id: "reports", label: "📈 Reports" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Portal</h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-blue-600"
                  : "hover:bg-blue-700 text-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
        >
          🚪 Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.email}</h1>

        {activeTab === "dashboard" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p>Total Users: {allUsers.length}</p>
          </section>
        )}

        {activeTab === "students" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
