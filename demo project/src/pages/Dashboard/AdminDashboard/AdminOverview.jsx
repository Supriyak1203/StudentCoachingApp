import { BarChart2, Book, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    reportsGenerated: 0,
  });

  useEffect(() => {
    axios
      .get("/admin/overview")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <Users size={40} className="text-blue-600" />
          <div>
            <h3 className="text-lg text-gray-600">Total Students</h3>
            <p className="text-3xl font-bold">{stats.totalStudents}</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <Book size={40} className="text-green-600" />
          <div>
            <h3 className="text-lg text-gray-600">Total Courses</h3>
            <p className="text-3xl font-bold">{stats.totalCourses}</p>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <BarChart2 size={40} className="text-purple-600" />
          <div>
            <h3 className="text-lg text-gray-600">Reports Generated</h3>
            <p className="text-3xl font-bold">{stats.reportsGenerated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
