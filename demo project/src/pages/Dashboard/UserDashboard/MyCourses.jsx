import { useEffect, useState } from "react";
import { addCourse, getCourses } from "../../../services/api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
      setError("");
    } catch (err) {
      console.log(err.response || err);
      setError("Failed to load courses");
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.teacher) {
      setError("Please fill all fields");
      return;
    }

    try {
      await addCourse({ title: newCourse.title, teacher: newCourse.teacher });
      setNewCourse({ title: "", teacher: "" });
      fetchCourses(); // Refresh list
      setError("");
    } catch (err) {
      console.log(err.response || err);
      setError("Failed to add course");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Teacher"
          value={newCourse.teacher}
          onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAddCourse} className="bg-blue-500 text-white px-4 py-2">
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-500">By {course.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
