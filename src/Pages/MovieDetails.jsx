import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import Swal from "sweetalert2"; 

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loadingMovie, setLoadingMovie] = useState(true);

  // Fetch movie details
  useEffect(() => {
    setLoadingMovie(true);
    fetch(`https://movie-master-server-ashy.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch(() => toast.error("Failed to fetch movie details!"))
      .finally(() => setLoadingMovie(false));
  }, [id]);

  if (loadingMovie || !movie)
    return (
      <div
        className={`flex justify-center items-center h-[60vh] ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Loading />
      </div>
    );

  // Add to My Collection
  const handleAddToCollection = () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      rating: movie.rating,
      posterUrl: movie.posterUrl,
      addedBy: user.email,
    };

    fetch("https://movie-master-server-ashy.vercel.app/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then(() => toast.success("Added to My Collection!"))
      .catch(() => toast.error("Failed to add movie!"));
  };

  // Add to Watchlist
  const handleAddToWatchlist = () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (movie.inWatchlist) {
      toast.info("Already in your Watchlist!");
      return;
    }

    fetch(`https://moviemaster-pro-server.vercel.app/movies/${movie._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inWatchlist: true,
        addedBy: movie.addedBy || user.email,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setMovie((prev) => ({
          ...prev,
          inWatchlist: true,
          addedBy: prev.addedBy || user.email,
        }));
        toast.success("Added to Watchlist!");
      })
      .catch(() => toast.error("Failed to add to Watchlist!"));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://moviemaster-pro-server.vercel.app/movies/${movie._id}`, {
          method: "DELETE",
        })
          .then(() => {
            toast.success("Movie deleted successfully!");
            navigate("/mycollection");
          })
          .catch(() => toast.error("Failed to delete movie!"));
      }
    });
  };

  const isOwner = user?.email === movie.addedBy;

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 p-6 rounded-lg transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <img
        src={movie.posterUrl || "https://via.placeholder.com/400x600"}
        alt={movie.title}
        className="w-full h-[400px] object-cover rounded-lg shadow-md mb-5"
      />
      <h2 className="text-3xl font-bold mb-3">{movie.title}</h2>
      <p className="text-lg mb-2">Genre: {movie.genre}</p>
      <p className="text-lg mb-2">Rating: {movie.rating}</p>
      <p className="text-lg mb-2">Year: {movie.releaseYear}</p>
      {movie.plotSummary && (
        <p
          className={`mt-5 transition-colors duration-300 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {movie.plotSummary}
        </p>
      )}

      <div className="flex gap-3 flex-wrap mt-5">
        <button
          onClick={handleAddToCollection}
          className={`px-4 py-2 rounded transition ${
            theme === "dark"
              ? "bg-green-700 text-white hover:bg-green-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Add to My Collection
        </button>

        {!movie.inWatchlist && (
          <button
            onClick={handleAddToWatchlist}
            className={`px-4 py-2 rounded transition ${
              theme === "dark"
                ? "bg-yellow-600 text-white hover:bg-yellow-500"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Add to Watchlist
          </button>
        )}

        {isOwner && (
          <>
            <button
              onClick={() => navigate(`/movies/update/${movie._id}`)}
              className={`px-4 py-2 rounded transition ${
                theme === "dark"
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`px-4 py-2 rounded transition ${
                theme === "dark"
                  ? "bg-red-700 text-white hover:bg-red-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
