import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router";
import { Volume2 } from "lucide-react";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen text-center p-4 overflow-hidden transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-b from-gray-100 via-gray-200 to-white text-gray-900"
      }`}
    >
      {/* Glowing 404 text */}
      <h1
        className={`text-[10rem] font-extrabold mb-4 select-none ${
          theme === "dark"
            ? "text-red-400 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]"
            : "text-red-600 drop-shadow-[0_0_15px_rgba(255,100,100,0.5)]"
        } animate-glow-bounce`}
      >
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl font-semibold mb-4 animate-fadeUp">
        Page Not Found
      </h2>

      <p className="mb-6 text-lg animate-fadeUp delay-150">
        The page you’re looking for doesn’t exist. 😢
      </p>

      <Link
        to="/"
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition shadow-lg animate-fadeUp delay-300"
      >
        Go Home
      </Link>

      {/* Floating stars */}
      <div className="absolute top-10 left-5 w-3 h-3 bg-yellow-400 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-20 right-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-yellow-200 rounded-full animate-pulse-slow"></div>

      {/* Custom animations */}
      <style>
        {`
          @keyframes glow-bounce {
            0%, 100% { transform: translateY(0); text-shadow: 0 0 20px rgba(255,0,0,0.7); }
            50% { transform: translateY(-20px); text-shadow: 0 0 40px rgba(255,0,0,0.9); }
          }
          .animate-glow-bounce {
            animation: glow-bounce 2s infinite ease-in-out;
          }

          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp {
            animation: fadeUp 1s ease-out forwards;
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
