import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading.jsx";
import Swal from "sweetalert2";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `http://localhost:3000/movies?addedBy=${encodeURIComponent(
        user.email
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch your collection!");
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't delete this movie from your collection!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMovies((prev) => prev.filter((movie) => movie._id !== id));
            Swal.fire("Deleted!", "Your movie has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete the movie.", "error");
            console.error(err);
          });
      }
    });
  };

  if (!user) {
    return (
      <div
        className={`text-center text-3xl font-bold mt-10 mb-6 ${
          theme === "dark" ? "text-orange-600" : "text-orange-600"
        }`}
      >
        Please login to see your collection.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div   className={
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }>

    <div className="max-w-5xl mx-auto pb-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2
        className={`text-4xl text-center pt-5 font-extrabold mb-8 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <span className="text-orange-600">My Movie Collection</span>
      </h2>

      {movies.length === 0 ? (
        <p
          className={`text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          You haven't added any movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className={`p-4 shadow-lg rounded ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/400x600"}
                alt={movie.title}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h3 className="font-bold text-xl">{movie.title}</h3>
              <p>Rating: {movie.rating}</p>
              <p>Genre: {movie.genre}</p>

              <div className="flex gap-2 mt-3">
                {/* Edit button navigates to update component */}
                <button
                  onClick={() => navigate(`/movies/update/${movie._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                {/* Delete button triggers SweetAlert2 */}
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyCollection;
