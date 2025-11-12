import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, LogIn, Mail, Lock, Loader2, Chrome } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { signInUser, loginGoogle } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginGoogle();
      toast.success("Login with Google successful!");
      navigate("/");
    } catch (err) {
      toast.error(`Google login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
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
            <LogIn className="w-7 h-7" /> Welcome Back!
          </motion.h2>
          <p
            className={`mt-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to continue exploring MovieMaster Pro 🎬
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          className="w-full mt-5 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          disabled={loading}
        >
          <Chrome size={20} />
          {loading ? "Processing..." : "Login with Google"}
        </motion.button>

        {/* Links */}
        <div className="mt-6 text-center text-sm">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
          <p className="mt-1">
            Forgot password?{" "}
            <Link
              to="/forgot"
              className="text-blue-500 hover:underline font-medium"
            >
              Reset here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
