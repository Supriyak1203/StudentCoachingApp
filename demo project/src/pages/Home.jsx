import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome to Student Coaching App</h1>
        <p className="max-w-xl mb-10 text-lg drop-shadow-md">
          Empowering students to reach their full potential with personalized coaching.
        </p>
        <Link to="/signup" className="bg-orange-600 hover:bg-orange-700 transition px-6 py-3 rounded text-white font-semibold">
          Register Now
        </Link>
      </div>
    </div>
  );
}
