import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center mt-8 text-slate-400">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.imdbID}
          to={`/movie/${movie.imdbID}`}
          className="group cursor-pointer bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 border border-slate-700/30 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
              {movie.Title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{movie.Year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;