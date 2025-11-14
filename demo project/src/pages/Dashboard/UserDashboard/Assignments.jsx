import { useEffect, useState } from "react";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentsForUser,
  submitAssignment,
  updateAssignment,
} from "../../../services/assignmentsApi";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  // Editing states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await getAssignmentsForUser();
      setAssignments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch", err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Add assignment
  async function handleAdd(e) {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const studentEmail = user?.email || null;

      await createAssignment({
        ...form,
        studentEmail,
      });

      setForm({ title: "", description: "", dueDate: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  }

  // ✅ Start editing
  function startEdit(a) {
    setIsEditing(true);
    setEditId(a.id);
    setForm({
      title: a.title,
      description: a.description,
      dueDate: a.dueDate,
    });
  }

  // ✅ Update assignment
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updateAssignment(editId, form);
      setIsEditing(false);
      setEditId(null);
      setForm({ title: "", description: "", dueDate: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  // ✅ Submit Assignment
  async function handleSubmit(id) {
    try {
      await submitAssignment(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  }

  // ✅ Delete
  async function handleDelete(id) {
    if (!confirm("Delete?")) return;
    try {
      await deleteAssignment(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>

      {/* ✅ Form */}
      <form
        onSubmit={isEditing ? handleUpdate : handleAdd}
        className="mb-6 space-x-2"
      >
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="border p-2 rounded"
        />

        <input
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setForm({ title: "", description: "", dueDate: "" });
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* ✅ Table Format */}
      {loading ? (
        <p>Loading...</p>
      ) : assignments.length === 0 ? (
        <p>No assignments yet</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="text-center">
                <td className="border p-2">{a.title}</td>
                <td className="border p-2">{a.description}</td>
                <td className="border p-2">{a.dueDate}</td>

                <td
                  className={`border p-2 font-semibold ${
                    a.status === "PENDING" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {a.status}
                </td>

                <td className="border p-2 space-x-2">
                  {/* Submit */}
                  {a.status === "PENDING" && (
                    <button
                      onClick={() => handleSubmit(a.id)}
                      className="bg-emerald-600 text-white px-2 py-1 rounded"
                    >
                      Submit
                    </button>
                  )}

                  {/* Edit */}
                  <button
                    onClick={() => startEdit(a)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
