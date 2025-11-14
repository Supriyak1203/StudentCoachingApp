import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function AdminManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">Instructor: {course.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
