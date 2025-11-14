import { useEffect, useState } from "react";
import axios from "../../../services/api";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    adminName: "",
    email: "",
    theme: "light",
    notifications: true,
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch current settings when component loads
  useEffect(() => {
    axios
      .get("/admin/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Save settings (POST or PUT)
  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post("/admin/settings", settings)
      .then(() => {
        setMessage("✅ Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Error saving settings:", err);
        setMessage("❌ Failed to save settings");
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Admin Name */}
        <div>
          <label className="block font-semibold mb-1">Admin Name</label>
          <input
            type="text"
            name="adminName"
            value={settings.adminName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter admin email"
          />
        </div>

        {/* Theme Selection */}
        <div>
          <label className="block font-semibold mb-1">Dashboard Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <label>Enable Email Notifications</label>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
