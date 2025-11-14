import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

import Assignments from "../pages/Dashboard/UserDashboard/Assignments";
import Attendance from "../pages/Dashboard/UserDashboard/Attendance";
import MyCourses from "../pages/Dashboard/UserDashboard/MyCourses";
import Overview from "../pages/Dashboard/UserDashboard/Overview";
import Profile from "../pages/Dashboard/UserDashboard/Profile";

export default function CandidateDashboardLayout() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* ✅ Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ✅ Main Content */}
      <div className="flex flex-col flex-1">

        {/* ✅ Simple Top Bar (instead of Navbar) */}
        <div className="w-full bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>

        {/* ✅ Dashboard Pages */}
        <div className="p-6 overflow-y-scroll">
          {activeTab === "overview" && <Overview />}
          {activeTab === "courses" && <MyCourses />}
          {activeTab === "attendance" && <Attendance />}
          {activeTab === "assignments" && <Assignments />}
          {activeTab === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}
