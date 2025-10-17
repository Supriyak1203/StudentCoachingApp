import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Student Coaching</Link>
      </div>

      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
        <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
      </div>
    </nav>
  );
}
