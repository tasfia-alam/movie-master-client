import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, User, Mail, Lock, Loader2, Chrome } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const { register, loginGoogle } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return uppercase && lowercase && minLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      return toast.error(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters."
      );
    }
    setLoading(true);
    try {
      await register(email, password);
      toast.success("User registered successfully!", {
        onClose: () => navigate("/login"),
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await loginGoogle();
      toast.success("Google login successful!", {
        onClose: () => navigate("/"),
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(`Google login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 pb-5 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`max-w-md w-full p-10 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-500 ${
          theme === "dark"
            ? "bg-gray-800/90 border border-gray-700"
            : "bg-white/90 border border-gray-200"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold flex items-center justify-center gap-2 text-blue-500"
          >
            <User className="w-7 h-7" /> Create Account
          </motion.h2>
          <p
            className={`mt-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join MovieMaster Pro and start exploring your favorite movies 🎬
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="relative">
            <User
              className={`absolute left-3 top-3 w-5 h-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Full Name"
              className={`border pl-10 p-3 rounded-xl w-full focus:outline-none focus:ring-2 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Photo URL */}
          <input
            type="text"
            placeholder="Photo URL (optional)"
            className={`border p-3 rounded-xl w-full focus:outline-none focus:ring-2 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
            }`}
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          {/* Email */}
          <div className="relative">
            <Mail
              className={`absolute left-3 top-3 w-5 h-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              className={`border pl-10 p-3 rounded-xl w-full focus:outline-none focus:ring-2 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className={`absolute left-3 top-3 w-5 h-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`border pl-10 p-3 rounded-xl w-full focus:outline-none focus:ring-2 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <User size={20} />}
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Google Register */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleRegister}
          className="w-full mt-5 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          disabled={loading}
        >
          <Chrome size={20} />
          {loading ? "Processing..." : "Register with Google"}
        </motion.button>

        {/* Links */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
