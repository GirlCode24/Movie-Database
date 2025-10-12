import React from 'react';

const MovieCard = ({ movie, onSelect }) => {
  // Some movies may not have a poster, so we use a placeholder
  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 cursor-pointer overflow-hidden"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={poster}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-gray-600 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
