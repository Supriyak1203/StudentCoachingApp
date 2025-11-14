import { useState } from "react";
import resetImage from "../assets/resetimage.jpg"; // ✅ Import background image
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await resetPassword(form.email, form.newPassword);
      // Success alert and navigation handled in AuthContext
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${resetImage})` }} // ✅ Set image as background
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-fullyblur-md p-8 rounded-2xl shadow-lg w-full max-w-md "
      >
        <h2 className="text-3xl font-semibold text-center text-orange mb-6">
          Reset Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg  focus:bg-white outline-none border-none"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-orange/70 focus:bg-orange-500 outline-none border-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Reset Password
        </button>

        {error && <p className="mt-4 text-center text-red-300">{error}</p>}
      </form>
    </div>
  );
}