import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const API_KEY = "9bcecba2";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch default movies (Batman)
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError("No movies found.");
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultMovies();
  }, []);

  // ✅ Search function
  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setMovies([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found for that search.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Navigate to movie details
  const handleSelectMovie = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6 md:p-10 mt-10 mb-10">

        <div className="text-center pb-6 border-b border-gray-200">
  <h1 className="text-3xl font-bold text-blue-700 mb-4">🎥 Movie Explorer</h1>
  <div className="w-full md:w-2/3 mx-auto">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={handleSearch}
    />
  </div>
</div>


        {/* 🔄 Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        )}

        {/* ⚠️ Error message */}
        {error && !loading && (
          <p className="text-center text-red-500 mt-8">{error}</p>
        )}

        {/* 🎞️ Movie List */}
        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} onSelect={handleSelectMovie} />
        )}
      </div>
    </div>
  );
};

export default Home;
