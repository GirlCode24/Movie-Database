import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "9bcecba2";

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch detailed info for selected movie
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 p-6">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      {/* Back button */}
      <div className="w-full max-w-5xl mb-6">
        <Link
          to="/"
          className="inline-block text-blue-600 hover:underline text-lg"
        >
          ← Back to Search
        </Link>
      </div>

      {/* Movie card */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full">
        {/* Poster */}
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-60 md:w-72 rounded-lg shadow-md"
        />

        {/* Details */}
        <div className="text-gray-800">
          <h2 className="text-3xl font-bold mb-2 text-blue-700">
            {movie.Title}
          </h2>
          <p className="text-gray-600 mb-1">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
