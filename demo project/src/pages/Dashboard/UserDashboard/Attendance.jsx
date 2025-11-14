import { useEffect, useState } from "react";
import { addAttendance, getAttendance } from "../../../services/api"; // adjust path

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Present"); // select status
  const [date, setDate] = useState(""); // input date

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance();
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance");
    }
  };

  const handleAddAttendance = async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem("user"))?.email; // must match JWT email
      const res = await addAttendance({ studentEmail: userEmail, date, status });
      setAttendance([...attendance, res.data]); // add to table
      setDate("");
    } catch (err) {
      console.error(err);
      setError("Failed to add attendance");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mr-2">
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button onClick={handleAddAttendance} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.date}</td>
              <td className={`border px-4 py-2 ${a.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
