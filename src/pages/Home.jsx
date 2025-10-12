import React, { useState, useEffect } from "react";
import "./Home.css";

const API_KEY = "9bcecba2";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch default movies when page loads
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) setMovies(data.Search);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Handle search button click
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setMovies([]);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">🎬 Movie Explorer</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p className="no-movies">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
