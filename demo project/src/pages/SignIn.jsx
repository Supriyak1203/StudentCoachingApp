import { useState } from "react";
import { Link } from "react-router-dom";
import signInImg from "../assets/SignInImg.jpg"; // import your image
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { signin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(form);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${signInImg})`,
     backgroundPosition: "center -60px",
   }}
    >
      {/* Transparent Form */}
      <form
  className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-transparent mt-18" // ✅ added mt-12
  onSubmit={handleSubmit}
>

        <h2 className="text-4xl font-extrabold text-center mb-6 text-white-500 drop-shadow-md">
          Sign In
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-500 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-orange-400 bg-transparent text-orange-500 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition font-semibold shadow-lg shadow-orange-500/30"
        >
          Sign In
        </button>

        <p className="text-center mt-3 text-sm text-orange-400">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="hover:underline font-semibold">
            Reset Password
          </Link>
        </p>

        <p className="text-center mt-2 text-sm text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="hover:underline font-semibold text-orange-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}