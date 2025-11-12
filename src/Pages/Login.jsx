import { useContext, useState,  } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react"; 

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
      toast.success("Login successful! ");
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
      toast.success("Login with Google successful! ");
      navigate("/");
    } catch (err) {
      toast.error(`Google login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div
        className={`max-w-md w-full p-8 rounded-2xl shadow-2xl transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Welcome Back 👋</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className={`border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white"
                : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900"
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

          <button
            type="submit"
            className={`py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Login with Google"}
        </button>

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
      </div>
    </div>
  );
};

export default Login;
