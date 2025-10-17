import { useState } from "react";
import { Link } from "react-router-dom";
import signInImg from "../assets/SignInImg.jpg";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signin(form); // AuthContext handles role-based navigation
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-900 bg-cover bg-center"
      style={{ backgroundImage: `url(${signInImg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-black/80 backdrop-blur-lg border border-gray-700 shadow-lg"
      >
        <h2 className="text-4xl font-extrabold text-center mb-4 text-white drop-shadow-md">
          Sign In
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition font-semibold shadow-md shadow-orange-500/50"
        >
          Sign In
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}

        <p className="text-center mt-3 text-sm text-gray-400">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="hover:underline text-orange-400 font-semibold">
            Reset Password
          </Link>
        </p>

        <p className="text-center mt-2 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="hover:underline font-semibold text-orange-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
