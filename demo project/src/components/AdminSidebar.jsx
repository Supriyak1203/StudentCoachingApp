import { BarChart2, Book, LayoutDashboard, Settings, Users } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard /> },
    { id: "reports", label: "Reports", icon: <BarChart2 /> },
    { id: "courses", label: "Manage Courses", icon: <Book /> },
    { id: "students", label: "Manage Students", icon: <Users /> },
    { id: "settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
      </div>

      <ul className="flex-1 p-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mb-2 ${
              activeTab === item.id
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
