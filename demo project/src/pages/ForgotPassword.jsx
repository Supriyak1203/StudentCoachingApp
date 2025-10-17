import { useState } from "react";
import resetImage from "../assets/resetimage.jpg";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(form.email, form.newPassword);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${resetImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-500 drop-shadow-md">
          Reset Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold shadow-lg shadow-orange-500/30"
        >
          Reset Password
        </button>

        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      </form>
    </div>
  );
}
