import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../context/AuthContext";

// Admin Pages
import AdminManageCourses from "../pages/Dashboard/AdminDashboard/AdminManageCourses";
import AdminManageStudents from "../pages/Dashboard/AdminDashboard/AdminManageStudents";
import AdminOverview from "../pages/Dashboard/AdminDashboard/AdminOverview";
import AdminReports from "../pages/Dashboard/AdminDashboard/AdminReports";
import AdminSettings from "../pages/Dashboard/AdminDashboard/AdminSettings";

export default function AdminDashboardLayout() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "courses":
        return <AdminManageCourses />;
      case "students":
        return <AdminManageStudents />;
      case "reports":
        return <AdminReports />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="w-full bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user?.name || "Admin"}</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">{renderPage()}</div>
      </div>
    </div>
  );
}
