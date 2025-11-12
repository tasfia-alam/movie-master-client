import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-300 border-t border-gray-700"
          : "bg-gray-100 text-gray-800 border-t border-gray-300"
      } mt-10 py-8 px-4`}
    >
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Website Name */}
        <h2 className="text-2xl font-bold text-indigo-500">
          🎬 <span className="text-orange-600">Movie</span>Master{" "}
          <span className="text-orange-600">Pro</span>
        </h2>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link
            to="/my-collection"
            className="hover:text-indigo-500 transition"
          >
            My Collection
          </Link>
          <Link to="/add-movie" className="hover:text-indigo-500 transition">
            Add Movie
          </Link>
          <Link to="/about" className="hover:text-indigo-500 transition">
            About
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5">
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Facebook size={22} />
          </a>
          {/* <img src={twit} sizes={22} alt="" /> */}
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Instagram size={22} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="hover:text-indigo-500 transition"
          >
            <Youtube size={22} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
