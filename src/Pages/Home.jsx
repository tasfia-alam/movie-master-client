import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import HomeHero from "./HomeHero";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [selectedGenre, setSelectedGenre] = useState("All");

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
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`statistics py-12 mt-10 ${
          theme === "dark" ? "bg-orange-500" : "bg-white"
        }`}
      >
        <h2
          className={`statistics text-4xl font-extrabold text-center mb-6 ${
            theme === "dark" ? "text-white" : "text-orange-500"
          }`}
        >
          Statistics
        </h2>

        <div className="flex justify-center gap-10 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-black text-white shadow-lg p-6 rounded-lg w-44 text-center"
          >
            Total Movies: {movies.length}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-black text-white shadow-lg p-6 rounded-lg w-44 text-center"
          >
            Total Users: 3
          </motion.div>
        </div>
      </motion.section>

      {/* Top Rated Movies */}
      <section className="top-rated py-12">
        <div
          className={theme === "dark" ? " text-white" : " text-gray-900"}
        >
          <h2 className="text-4xl font-extrabold text-center mb-6 pb-6">
            Top Rated Movies ✨
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5"
        >
          {topRatedMovies.map((movie) => (
            <motion.div
              key={movie._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              className={`movie-card ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-lg`}
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Recently Added Movies */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="recently-added py-12"
      >
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Recently Added
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-5">
          {recentlyAddedMovies.map((movie) => (
            <motion.div
              key={movie._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              className={`movie-card ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-lg overflow-hidden shadow-lg`}
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
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Genre Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="genres py-12 bg-orange-500 "
      >
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Browse By Genre
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {genres.map((genre, idx) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full transition-transform ${
                selectedGenre === genre
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>

        {selectedGenre !== "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5"
          >
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <motion.div
                  key={movie._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className={`movie-card ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } rounded-lg overflow-hidden shadow-lg`}
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
                </motion.div>
              ))
            ) : (
              <p className="text-4xl font-extrabold text-red-600 text-center py-6 col-span-full">
                <span>opps !!</span>
                <br />
                No movies found in this genre.
              </p>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* About Platform */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`about-platform py-16 px-6 ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-b from-gray-100 to-white text-gray-800"
        } transition-all duration-500`}
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
              theme === "dark" ? "text-orange-500" : "text-gray-700"
            }`}
          >
            About{" "}
            <span
              className={`${
                theme === "dark" ? "text-white" : "text-orange-600"
              }`}
            >
              MovieMaster
            </span>{" "}
            Pro
          </h2>

          <div
            className={`w-20 h-[3px] mx-auto rounded-full ${
              theme === "dark" ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></div>

          <p
            className={`leading-relaxed text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
            style={{ maxWidth: "760px", margin: "0 auto" }}
          >
            MovieMaster Pro isn’t just a platform — it’s your personal movie
            companion. With a clean interface and powerful tools, it lets you
            discover, rate, and share your favorite films effortlessly. Stay
            inspired by the stories you love and build your ultimate movie
            universe. 🎬✨
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              "🎬 Browse Movies",
              "❤️ Save Favorites",
              "🧩 Smart Filters",
              "📁 Personal Collections",
            ].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`px-6 py-4 rounded-2xl shadow-md ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                } transition-all duration-300`}
              >
                <span className="font-semibold">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
