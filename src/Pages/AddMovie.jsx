import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // ✅ Release Year added

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a movie!");
      return;
    }

    const newMovie = {
      title,
      genre,
      rating,
      posterUrl,
      releaseYear, 
      addedBy: user.email,
    };

    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Movie added successfully!");
        setTitle("");
        setGenre("");
        setRating("");
        setPosterUrl("");
        setReleaseYear(""); 
      })
      .catch(() => toast.error("Failed to add movie!"));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-4xl font-extrabold text-center mb-8">
        <span className="text-orange-600">Add</span> a <span className="text-orange-600">New</span> Movie
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          className="border p-2 rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          className="border p-2 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year" // ✅ Release Year field
          className="border p-2 rounded"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          className="border p-2 rounded"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
