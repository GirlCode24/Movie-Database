import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Clock, Film, Users, Award } from "lucide-react";

const API_KEY = "9bcecba2";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`);
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie not found.");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section with Backdrop Effect */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
          style={{
            backgroundImage: movie.Poster !== "N/A" ? `url(${movie.Poster})` : 'none'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg">Back to Search</span>
          </Link>

          {/* Main Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
            <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
              {/* Poster */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative group">
                  <img
                    src={
                      movie.Poster && movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-64 lg:w-80 rounded-xl shadow-2xl ring-4 ring-slate-700/50 group-hover:ring-amber-500/50 transition-all duration-300"
                  />
                  {movie.imdbRating && (
                    <div className="absolute -top-3 -right-3 bg-amber-500 text-slate-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1">
                      <Star size={18} fill="currentColor" />
                      {movie.imdbRating}
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-6">
                {/* Title and Year */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                    {movie.Title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-slate-300">
                    {movie.Year && (
                      <span className="flex items-center gap-1 bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                        <Calendar size={16} />
                        {movie.Year}
                      </span>
                    )}
                    {movie.Runtime && (
                      <span className="flex items-center gap-1 bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                        <Clock size={16} />
                        {movie.Runtime}
                      </span>
                    )}
                    {movie.Rated && (
                      <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {movie.Rated}
                      </span>
                    )}
                  </div>
                </div>

                {/* Genre */}
                {movie.Genre && (
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(", ").map((genre, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 bg-slate-700/70 text-slate-200 rounded-full text-sm hover:bg-slate-600/70 transition-colors"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && (
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                    <p className="text-slate-200 leading-relaxed text-lg">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.Director && (
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center gap-2 text-amber-400 mb-2">
                        <Film size={20} />
                        <span className="font-semibold">Director</span>
                      </div>
                      <p className="text-slate-200">{movie.Director}</p>
                    </div>
                  )}

                  {movie.Actors && (
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center gap-2 text-amber-400 mb-2">
                        <Users size={20} />
                        <span className="font-semibold">Cast</span>
                      </div>
                      <p className="text-slate-200">{movie.Actors}</p>
                    </div>
                  )}

                  {movie.Writer && (
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center gap-2 text-amber-400 mb-2">
                        <Film size={20} />
                        <span className="font-semibold">Writer</span>
                      </div>
                      <p className="text-slate-200">{movie.Writer}</p>
                    </div>
                  )}

                  {movie.Awards && movie.Awards !== "N/A" && (
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center gap-2 text-amber-400 mb-2">
                        <Award size={20} />
                        <span className="font-semibold">Awards</span>
                      </div>
                      <p className="text-slate-200">{movie.Awards}</p>
                    </div>
                  )}
                </div>

                {/* Additional Ratings */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                    <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                      <Star size={20} />
                      Ratings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {movie.Ratings.map((rating, idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-slate-400 text-sm mb-1">{rating.Source}</p>
                          <p className="text-white text-xl font-bold">{rating.Value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Box Office */}
                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg p-4 border border-amber-500/30">
                    <p className="text-amber-400 text-sm mb-1">Box Office</p>
                    <p className="text-white text-2xl font-bold">{movie.BoxOffice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;