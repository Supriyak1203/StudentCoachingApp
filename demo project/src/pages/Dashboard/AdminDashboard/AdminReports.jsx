import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    date: "",
  });

  // ✅ Fetch existing reports
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios
      .get("/admin/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports:", err));
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newReport.title || !newReport.description || !newReport.date) {
      alert("Please fill all fields!");
      return;
    }

    axios
      .post("/admin/reports", newReport)
      .then((res) => {
        alert("✅ Report added successfully!");
        setNewReport({ title: "", description: "", date: "" });
        fetchReports(); // Refresh list
      })
      .catch((err) => {
        console.error("Error adding report:", err);
        alert("❌ Failed to add report");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Add Report Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={newReport.title}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newReport.description}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="date"
          name="date"
          value={newReport.date}
          onChange={handleChange}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Report
        </button>
      </form>

      {/* Display Reports */}
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports available yet.</p>
      ) : (
        <ul className="bg-white p-6 rounded-lg shadow">
          {reports.map((r) => (
            <li key={r.id} className="border-b py-3">
              <strong className="block text-lg">{r.title}</strong>
              <p className="text-gray-600">{r.description}</p>
              <small className="text-gray-500">{r.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
