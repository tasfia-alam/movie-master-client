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
    return <div className="text-center mt-10">
      <Loading></Loading>
    </div>;
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative w-full h-[400px]">
      <img
        src={currentMovie?.posterUrl || "https://via.placeholder.com/400x600"}
        alt={currentMovie?.title || "Movie Poster"}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-3xl font-bold">
          {currentMovie?.title || "Unknown Title"}
        </h2>
        <p>Rating: {currentMovie?.rating || "N/A"}</p>
      </div>
    </div>
  );
};

export default HomeHero;
