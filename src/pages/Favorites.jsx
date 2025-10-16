import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          <span className="text-lg">Back to Search</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            ❤️ My <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Favorites</span>
          </h1>
          <p className="text-slate-400 text-lg">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12">
              <div className="text-6xl mb-4">💔</div>
              <p className="text-slate-300 text-xl mb-2">No favorites yet</p>
              <p className="text-slate-400 text-sm mb-6">Start adding movies you love!</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div key={movie.imdbID} className="relative group">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="block cursor-pointer bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 border border-slate-700/30 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        movie.Poster && movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.Title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {movie.Title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{movie.Year}</p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(movie.imdbID)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors z-10"
                  title="Remove from favorites"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;