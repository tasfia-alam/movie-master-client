import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Facebook, Instagram, Youtube, Home, PlusCircle, Info, Film } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <footer
      className={`${
        isDark
          ? "bg-gray-950 text-gray-200 border-t border-gray-800"
          : "bg-gray-100 text-gray-800 border-t border-gray-300"
      } py-10 px-6 transition-all duration-500`}
    >
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Website Name */}
        <h2
          className={`text-3xl font-extrabold tracking-wide ${
            isDark ? "text-orange-500" : "text-gray-700"
          } flex justify-center items-center gap-2`}
        >
          📽️ <span className="text-orange-500">MovieMasterPro</span>
        </h2>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium mt-6">
          <Link
            to="/"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Home size={18} /> Home
          </Link>

          <Link
            to="/my-collection"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Film size={18} /> My Collection
          </Link>

          <Link
            to="/add-movie"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <PlusCircle size={18} /> Add Movie
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Info size={18} /> About
          </Link>
        </div>

        {/* Divider Line */}
        <div
          className={`w-28 h-[2px] mx-auto rounded-full ${
            isDark ? "bg-orange-500" : "bg-gray-400"
          }`}
        ></div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-8 mt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Facebook size={20} /> <span className="hidden sm:inline">Facebook</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Instagram size={20} /> <span className="hidden sm:inline">Instagram</span>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            className={`flex items-center gap-2 hover:scale-110 transition ${
              isDark ? "hover:text-orange-400" : "hover:text-gray-600"
            }`}
          >
            <Youtube size={20} /> <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>

        {/* Copyright */}
        <p
          className={`text-sm mt-6 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          © {new Date().getFullYear()}{" "}
          <span
            className={`font-semibold ${
              isDark ? "text-orange-500" : "text-gray-700"
            }`}
          >
            MovieMasterPro
          </span>{" "}
          | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
