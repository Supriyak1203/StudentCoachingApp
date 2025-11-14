import { useState } from "react";
import { Link } from "react-router-dom";
import signUpImg from "../assets/signUpImg.jpg";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    await signup(form);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${signUpImg})` }}
    >
      {/* Glass Effect Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center mb-4 text-orange-500 drop-shadow-md">
          Sign Up
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-600 placeholder-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="user" className="text-black">
            User
          </option>
          <option value="admin" className="text-black">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition font-semibold shadow-lg shadow-orange-500/30"
        >
          Register
        </button>

        <p className="text-center mt-3 text-sm text-white/90">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange-400 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}