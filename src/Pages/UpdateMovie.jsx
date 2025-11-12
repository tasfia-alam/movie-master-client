import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { ThemeContext } from "../context/ThemeContext"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMovie = ({ loggedInUserEmail }) => {
  const { theme } = useContext(ThemeContext); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch(`https://movie-master-server-ashy.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovieData(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch movie details!");
      });
  }, [id]);

  if (!movieData)
    return (
      <div
        className={`flex justify-center items-center h-[60vh] ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        Loading...
      </div>
    );

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://movie-master-server-ashy.vercel.app/movies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    })
      .then(() => {
        toast.success("Movie updated successfully! ");
        setTimeout(() => navigate("/mycollection"), 1500);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update movie!");
      });
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-lg transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-3xl font-bold mb-6 text-center">Update Movie</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {Object.keys(movieData).map((key) => {
          if (key === "addedBy" || key === "_id") return null;
          return (
            <input
              key={key}
              type={
                key === "rating" || key === "duration" || key === "releaseYear"
                  ? "number"
                  : "text"
              }
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={movieData[key]}
              onChange={handleChange}
              className={`border p-3 rounded focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900"
              }`}
              required
            />
          );
        })}
        <button
          className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
