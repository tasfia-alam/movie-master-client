import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext"; 
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import "react-toastify/dist/ReactToastify.css";

const WatchList = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch watchlist
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://moviemaster-pro-server.vercel.app/movies`)
      .then((res) => res.json())
      .then((data) => {
        const watchlistMovies = data.filter(
          (movie) => movie.addedBy === user.email && movie.inWatchlist === true
        );
        setMovies(watchlistMovies);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch your watchlist!");
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleRemove = (movieId) => {
    if (!window.confirm("Remove this movie from your watchlist?")) return;

    fetch(`https://moviemaster-pro-server.vercel.app/movies/${movieId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inWatchlist: false }),
    })
      .then((res) => res.json())
      .then(() => {
        setMovies((prev) => prev.filter((movie) => movie._id !== movieId));
        toast.success("Removed from watchlist!");
      })
      .catch((err) => {
        toast.error("Failed to remove movie!");
        console.error(err);
      });
  };

  if (!user)
    return (
      <p
        className={`${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        } text-center mt-10`}
      >
        Please login to see your watchlist.
      </p>
    );

  if (loading)
    return (
      <div
        className={`flex justify-center items-center h-[60vh] ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Loading />
      </div>
    );

  return (
    <div
      className={`max-w-5xl mx-auto mt-10 p-4 rounded ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-4xl text-center mt-2 font-extrabold mb-6">
        My <span className="text-orange-600">Watchlist</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className={`p-4 rounded shadow-lg relative ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/400x600"}
                className="w-full h-64 object-cover rounded mb-3"
                alt={movie.title}
              />
              <h3 className="font-bold text-xl">{movie.title}</h3>
              <p>Rating: {movie.rating}</p>
              <p>Genre: {movie.genre}</p>

              <button
                onClick={() => handleRemove(movie._id)}
                className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
                  theme === "dark"
                    ? "bg-red-700 text-white hover:bg-red-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;
