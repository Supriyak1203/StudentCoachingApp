import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function Overview() {
  const [overview, setOverview] = useState({
    totalCourses: 0,
    attendancePercentage: 0,
    assignmentsPending: 0,
  });

  useEffect(() => {
    axios.get("/dashboard/overview")
      .then((res) => setOverview(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold">{overview.totalCourses}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <p className="text-3xl font-bold">{overview.attendancePercentage}%</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Assignments Pending</h2>
          <p className="text-3xl font-bold">{overview.assignmentsPending}</p>
        </div>

      </div>
    </div>
  );
}
