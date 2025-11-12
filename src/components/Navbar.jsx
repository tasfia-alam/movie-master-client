import { useState, useEffect, useRef, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSearch,
  FaMoon,
  FaSun,
  FaHome,
  FaFilm,
  FaPlusCircle,
  FaLayerGroup,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 1) {
        fetch(
          `https://moviemaster-pro-server.vercel.app/movies?search=${encodeURIComponent(
            query.trim()
          )}`
        )
          .then((res) => res.json())
          .then((data) => setSearchResults(data))
          .catch(() => setSearchResults([]));
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/movies?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
      setSearchResults([]);
    } else {
      navigate("/movies");
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 shadow-lg backdrop-blur-md transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-r from-white via-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wide"
        >
          <span className="text-orange-500">🎬</span>
          <span>
            Movie<span className="text-orange-500">Master</span>Pro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/allmovies"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            <FaFilm /> All Movies
          </NavLink>

          <NavLink
            to="/mycollection"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            <FaLayerGroup /> My Collection
          </NavLink>

          {user && (
            <NavLink
              to="/addmovie"
              className={({ isActive }) =>
                `flex items-center gap-1 transition-all ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "hover:text-orange-400"
                }`
              }
            >
              <FaPlusCircle /> Add Movie
            </NavLink>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className={`hidden lg:flex items-center rounded-full px-3 py-1 relative ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-all`}
          >
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`ml-2 bg-transparent outline-none text-sm ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            />
            {searchResults.length > 0 && (
              <ul
                className={`absolute top-10 right-0 w-60 rounded-lg shadow-xl overflow-hidden z-50 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                {searchResults.map((movie) => (
                  <li
                    key={movie._id}
                    onClick={() => {
                      navigate(`/movies/${movie._id}`);
                      setQuery("");
                      setSearchResults([]);
                    }}
                    className="px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    🎥 {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition hover:scale-110 hover:shadow-md"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 text-lg" />
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 rounded-full hover:scale-105 transition"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border border-orange-400 object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className={`w-8 h-8 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  />
                )}
              </button>

              {profileOpen && (
                <div
                  className={`absolute right-0 mt-3 w-48 rounded-xl shadow-lg overflow-hidden border ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-200 border-gray-700"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/watchlist"
                    className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700"
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-50 text-sm transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile & Tablet menu toggle */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="block lg:hidden text-2xl focus:outline-none"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t ${
            theme === "dark"
              ? "bg-gray-900/95 border-gray-700"
              : "bg-white/90 border-gray-200"
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {[{ to: "/", label: "Home" },
              { to: "/allmovies", label: "All Movies" },
              { to: "/mycollection", label: "My Collection" }].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-medium hover:text-orange-500 transition"
              >
                {link.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/addmovie"
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-medium hover:text-orange-500 transition"
              >
                Add Movie
              </NavLink>
            )}
            {!user ? (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 bg-orange-500 text-white rounded text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 border border-orange-500 text-orange-500 rounded text-center"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-orange-100 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
