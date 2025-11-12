import { useState, useEffect, useRef, useContext} from "react";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSearch,
  FaMoon,
  FaSun,
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
      className={`sticky top-0 z-40 shadow-md ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <h1
              className={`text-xl md:text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <span >📽️ MovieMaster</span>
              <span className="text-orange-500">Pro</span>
            </h1>
          </Link>
        </div>

        {/* Middle: Desktop nav + search */}
        <div className="hidden md:flex md:items-center md:gap-6 flex-1 ml-6">
          <nav className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-medium"
                  : theme === "dark"
                  ? "text-gray-200 hover:text-red-400"
                  : "text-gray-700 hover:text-red-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allmovies"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-medium"
                  : theme === "dark"
                  ? "text-gray-200 hover:text-red-400"
                  : "text-gray-700 hover:text-red-500"
              }
            >
              All Movies
            </NavLink>
            <NavLink
              to="/mycollection"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-medium"
                  : theme === "dark"
                  ? "text-gray-200 hover:text-red-400"
                  : "text-gray-700 hover:text-red-500"
              }
            >
              My Collection
            </NavLink>
            {user && (
              <NavLink
                to="/addmovie"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-medium"
                    : theme === "dark"
                    ? "text-gray-200 hover:text-red-400"
                    : "text-gray-700 hover:text-red-500"
                }
              >
                Add Movie
              </NavLink>
            )}
          </nav>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className={`ml-6 flex items-center rounded overflow-hidden relative ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`px-3 py-2 w-72 outline-none bg-transparent text-sm ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            />
            <button type="submit" className="px-3 py-2">
              <FaSearch
                className={theme === "dark" ? "text-white" : "text-gray-700"}
              />
            </button>

            {/*  Dropdown search result */}
            {searchResults.length > 0 && (
              <ul
                className={`absolute top-11 left-0 w-full max-h-64 overflow-y-auto rounded-lg shadow-lg z-50 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
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
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    🎥 {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* Right: Auth/Profile + Theme toggle */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
            }`}
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>

          {/* Auth/Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className={`flex items-center gap-2 px-3 py-1 rounded hover:${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      className={`w-8 h-8 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-600"
                      }`}
                    />
                  )}
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {user.displayName || user.email}
                  </span>
                </button>

                {profileOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 border rounded shadow-lg ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-200 border-gray-700"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/watchlist"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Watchlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-red-500 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="md:hidden p-2 rounded hover:bg-gray-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white"
          }`}
        >
          <div className="px-4 py-3 space-y-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`flex-1 px-3 py-2 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 border-gray-600"
                    : "bg-white text-gray-800"
                }`}
              />
              <button
                type="submit"
                className="px-3 py-2 bg-orange-600 text-white rounded"
              >
                <FaSearch />
              </button>
            </form>

            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/allmovies"
              onClick={() => setMobileOpen(false)}
              className={`block ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              All Movies
            </NavLink>
            <NavLink
              to="/mycollection"
              onClick={() => setMobileOpen(false)}
              className={`block ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              My Collection
            </NavLink>
            {user && (
              <NavLink
                to="/addmovie"
                onClick={() => setMobileOpen(false)}
                className={`block ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Add Movie
              </NavLink>
            )}

            {user ? (
              <div className="border-t pt-2">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      className={`w-10 h-10 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-600"
                      }`}
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded hover:bg-black hover:text-black"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/watchlist"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded hover:bg-black hover:text-black"
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-black hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 bg-red-600 text-white rounded text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 border border-red-600 text-red-600 rounded text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

