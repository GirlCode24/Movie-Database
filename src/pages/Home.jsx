import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { SearchContext } from "../context/SearchContext";

const API_KEY = "9bcecba2";

const Home = () => {
  const { movies, setMovies, lastSearch, setLastSearch } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async (query) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError("No movies found.");
        }
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    if (!lastSearch) {
      fetchMovies("batman");
      setLastSearch("batman");
    } 

  }, [lastSearch, setLastSearch, setMovies]);

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    setLastSearch(term);
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found for that search.");
      }
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (id) => navigate(`/movie/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            🎬 <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Movie</span> Explorer
          </h1>
          <p className="text-slate-400 text-lg">Discover your next favorite film</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} defaultValue={lastSearch} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-4"></div>
            <p className="text-slate-300 text-lg">Searching for movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
              <p className="text-red-400 text-xl mb-2">😔 {error}</p>
              <p className="text-slate-400 text-sm">Try searching for something else</p>
            </div>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && movies.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Search Results <span className="text-amber-400">({movies.length})</span>
              </h2>
              <p className="text-slate-400 text-sm">Showing results for "{lastSearch}"</p>
            </div>
            <MovieList movies={movies} onSelect={handleSelectMovie} />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && lastSearch && (
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-slate-300 text-xl mb-2">No movies found</p>
              <p className="text-slate-400 text-sm">Try a different search term</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;