import { useContext, useState,  } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react"; 

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
      toast.success("User registered successfully! ");
      navigate("/login");
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
      toast.success("Google login successful! ");
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
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div
        className={`max-w-md w-full p-8 rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className={`border p-3 rounded-lg focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-400"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Photo URL"
            className={`border p-3 rounded-lg focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-400"
            }`}
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className={`border p-3 rounded-lg focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-400"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400"
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

          <button
            type="submit"
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Register with Google"}
        </button>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
