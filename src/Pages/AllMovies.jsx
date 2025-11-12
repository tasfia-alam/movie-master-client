import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext"; 
import Loading from "../components/Loading";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 }); 
  const [loading, setLoading] = useState(true);

  const { users } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Fetch all movies
  useEffect(() => {
    setLoading(true);
    fetch("https://movie-master-server-ashy.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        // Initial filtered list
        setFilteredMovies(data);

        // Unique genres cleaned
        const allGenres = [
          "All",
          ...[...new Set(data.map((m) => m.genre.trim().toLowerCase()))].map(
            (g) => g.charAt(0).toUpperCase() + g.slice(1)
          ),
        ];
        setGenres(allGenres);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter movies by genre & rating
  useEffect(() => {
    let filtered = [...movies];

    // Genre filter
    if (selectedGenre !== "All") {
      filtered = filtered.filter(
        (movie) =>
          movie.genre.trim().toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // Rating filter
    filtered = filtered.filter(
      (movie) =>
        Number(movie.rating) >= ratingRange.min &&
        Number(movie.rating) <= ratingRange.max
    );

    setFilteredMovies(filtered);
  }, [selectedGenre, ratingRange, movies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div
          className={
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }
    >
    <div className="max-w-6xl mx-auto mt-10 p-4 transition-colors  duration-500">
      
      <h2 className="text-4xl text-center font-extrabold mb-8">
        All <span className="text-orange-600">Movies</span>
      </h2>

      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {genres.map((genre, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full hover:scale-105 transition-transform ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Rating Filter */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="number"
          value={ratingRange.min}
          min={0}
          max={ratingRange.max}
          onChange={(e) =>
            setRatingRange((prev) => ({
              ...prev,
              min: Number(e.target.value),
            }))
          }
          className="w-16 border rounded p-1"
        />
        <span className="text-center">to</span>
        <input
          type="number"
          value={ratingRange.max}
          min={ratingRange.min}
          max={10}
          onChange={(e) =>
            setRatingRange((prev) => ({
              ...prev,
              max: Number(e.target.value),
            }))
          }
          className="w-16 border rounded p-1"
        />
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <p className="text-center mt-10">No movies match your filters.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredMovies.map((movie) => {
            const isOwner = users?.email === movie.addedBy;
            return (
              <div
                key={movie._id}
                className={`rounded shadow p-4 flex flex-col hover:shadow-xl transition-shadow duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
              >
                <img
                  src={movie.posterUrl || "https://via.placeholder.com/400x600"}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded mb-2"
                />
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
                <p>Year: {movie.releaseYear}</p>
                <p>Rating: {movie.rating}</p>

                <button
                  className="mt-2 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/movieDetails/${movie._id}`)}
                >
                  Details
                </button>

                {isOwner && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                      onClick={() => navigate(`/movies/update/${movie._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      onClick={() => {
                        if (window.confirm("Are you sure to delete?")) {
                          fetch(
                            `https://movie-master-server-ashy.vercel.app/movies/${movie._id}`,
                            {
                              method: "DELETE",
                            }
                          )
                            .then(() =>
                              setMovies(
                                movies.filter((m) => m._id !== movie._id)
                              )
                            )
                            .catch((err) => console.error(err));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default AllMovies;
