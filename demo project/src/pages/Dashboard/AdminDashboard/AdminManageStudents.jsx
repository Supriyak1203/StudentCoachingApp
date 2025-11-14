import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function AdminManageStudents() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
  });

  // ✅ Fetch existing students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("/admin/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // ✅ Handle student submission (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newStudent.name || !newStudent.email || !newStudent.course) {
      alert("Please fill in all fields!");
      return;
    }

    axios
      .post("/admin/students", newStudent)
      .then((res) => {
        alert("✅ Student added successfully!");
        setNewStudent({ name: "", email: "", course: "" });
        fetchStudents(); // refresh table
      })
      .catch((err) => {
        console.error("Error adding student:", err);
        alert("❌ Failed to add student");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      {/* Add Student Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newStudent.course}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>

      {/* Student Table */}
      <table className="w-full border bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Course</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.course}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
