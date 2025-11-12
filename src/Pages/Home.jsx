import React, { useEffect, useState, useContext } from "react";
import HomeHero from "./HomeHero";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Backend থেকে MongoDB data fetch
  useEffect(() => {
    fetch("https://movie-master-server-ashy.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const featuredMovies = movies.slice(0, 5);
  const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const recentlyAddedMovies = [...movies]
    .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
    .slice(0, 6);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Animation",
  ];

  // Filter করা movie list
  const filteredMovies =
    selectedGenre === "All"
      ? []
      : movies.filter((movie) => movie.genre === selectedGenre);

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }
    >
      {/* Hero Section */}
      <HomeHero featuredMovies={featuredMovies} />

      {/* Statistics Section */}
      <section
        className={`statistics py-12 mt-10 ${
          theme === "dark" ? "bg-orange-500" : "bg-white"
        }`}
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 text-orange-600">Statistics</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="bg-black text-white shadow-lg p-6 rounded-lg w-44 text-center hover:scale-105 transition-transform">
            Total Movies: {movies.length}
          </div>
          <div className="bg-black text-white shadow-lg p-6 rounded-lg w-44 text-center hover:scale-105 transition-transform">
            Total Users: 3
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="top-rated py-12">
        <h2 className="text-4xl font-extrabold text-center mb-6">
          <span className="text-orange-600">Top</span> Rated{" "}
          <span className="text-orange-600">Movies</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5">
          {topRatedMovies.map((movie) => (
            <div
              key={movie._id}
              className={`movie-card ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform`}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3 text-center">
                <h4 className="font-semibold">{movie.title}</h4>
                <p>Rating: {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Recently Added Movies */}
      <section className="recently-added py-12">
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Re<span className="text-orange-600">cen</span>tly Added
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-5">
          {recentlyAddedMovies.map((movie) => (
            <div
              key={movie._id}
              className={`movie-card ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform`}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-3 text-center">
                <h4 className="font-semibold">{movie.title}</h4>
                <p>Year: {movie.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  Genre Section (Dynamic filter নিচে show হবে) */}
      <section className="genres py-12">
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Browse <span className="text-orange-600">by</span> Genre
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {selectedGenre !== "All" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie._id}
                  className={`movie-card ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform`}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3 text-center">
                    <h4 className="font-semibold">{movie.title}</h4>
                    <p>{movie.genre}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className=" text-4xl font-extrabold text-red-600 text-center text-gray-500 py-6 col-span-full">
                <span >opps !!</span>
                <br></br>

                No movies found in this genre.
              </p>
            )}
          </div>
        )}
      </section>

      {/* About Platform */}
      <section
        className={`about-platform py-12 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h2 className="text-4xl font-extrabold text-center mb-4">
          About <span className="text-orange-600">MovieMaster</span> Pro
        </h2>
        <p
          className={theme === "dark" ? "text-gray-200" : "text-gray-700"}
          style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}
        >
          MovieMaster Pro is a comprehensive movie management system where users
          can browse, manage, and organize their favorite movies with advanced
          filtering and personal collections.
        </p>
      </section>
    </div>
  );
};

export default Home;
