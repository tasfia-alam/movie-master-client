import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

const HomeHero = ({ featuredMovies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!featuredMovies || featuredMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [featuredMovies]);

  if (!featuredMovies || featuredMovies.length === 0) {
    return (
      <div className="text-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="carousel w-full h-[400px]">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie._id || index}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full"
        >
          <img
            src={movie.posterUrl || "https://via.placeholder.com/400x600"}
            alt={movie.title || "Movie Poster"}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute bottom-6 left-6 text-white bg-black/40 p-3 rounded-lg">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p>⭐ Rating: {movie.rating || "N/A"}</p>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${
                index === 0 ? featuredMovies.length : index
              }`}
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-red-500"
            >
              ❮
            </a>
            <a
              href={`#slide${
                index === featuredMovies.length - 1 ? 1 : index + 2
              }`}
              className="btn btn-circle bg-black/40 text-white border-none hover:bg-red-500"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeHero;
